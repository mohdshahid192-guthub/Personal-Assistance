import { Document } from "../model/document.model.js";
import {pinecone} from "../config/vector.js"
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { ApiError } from "../utils/errorHandler.js";
import { getVectorStore } from "../config/vector.js";
import { Document as langchainDoc } from "langchain";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { embeddings } from "../config/vector.js";
import { text } from "node:stream/consumers";
export const ingestDocument = async(title: string, content: string)  => {

const doc = await Document.create({title, content})

if (!doc) {
  throw new ApiError("Unable to store the document in Primary DB", 501)
}

   const vectors = await embeddings.embedQuery(content)

    const pineconeIndex = pinecone.Index({host: process.env.PINECONE_INDEX_HOST_URL!});
   
   const record = {
    id: doc._id.toString(),
     values: vectors,
     metadata: {
      title: title,
      mongoId: doc._id.toString(),
      text: content
     }
   }

 await  pineconeIndex.upsert({records: [record]})

return doc

}


export const ingestPDF = async (filePath: string, title: string) => {
  try {

    const loader = new PDFLoader(filePath, {
      splitPages: false
    })

    const rawDoc  = await loader.load()

   if (!rawDoc || rawDoc.length === 0) {
    throw new ApiError("No content to ingest", 400)
   }

   const fullText = rawDoc[0].pageContent

   const mongoDoc= await Document.findOneAndUpdate({title: title}, 
    {
      title: title,
      content: fullText,
      lastIngestedAt: new Date()
    },
    {upsert: true, returnDocument: 'after'}
  )

   if (!mongoDoc) {
    throw new ApiError("MongoDB Server is not connected or refused to store the doc", 500)
   }

   const pineconeIndex =  pinecone.Index({host: process.env.PINECONE_INDEX_HOST_URL!})
console.log("deleting older records");

try {
  await pineconeIndex.deleteMany({filter: {title: title}})
} catch (error) {
  console.log("No dublicate records to delete");
  
}


   const textsplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200
   })

   const chunkDocuments = await textsplitter.createDocuments(
    [fullText], 
    [{title: mongoDoc.title, mongoId: mongoDoc._id.toString() }]
   )

   const docToEmbed = chunkDocuments.map(chunk => chunk.pageContent)
   const vectors = await embeddings.embedDocuments(docToEmbed)



    const record = chunkDocuments.map((chunk, index) => (
      {
    id: `${ mongoDoc._id.toString()}-chunk-${index}`,
     values: vectors[index],
     metadata: {
      title: title,
      mongoId: mongoDoc._id.toString(),
      text: chunk.pageContent
     }
   }
    ))

   await pineconeIndex.upsert({records: record})

   return {
    message: "PDF successfully ingested and vectorized",
      documentId: mongoDoc._id,
      chunksCreated: chunkDocuments.length
   }
  } catch (error) {
    throw new ApiError("Can not ingest Pdf due to internal error", 501)
  }
}


//Ingestion service for URLs
export const ingestDocURL = async(url: string, title: string) => {
 try {
  
   const loader = new CheerioWebBaseLoader(url, {selector: "main"})
   const webDoc = await loader.load()
   const webPage = webDoc[0]
 
   const mongoDoc = await Document.findOneAndUpdate(
     {source: url}, 
     {
     source: url,
     title: title,
     content: webPage.pageContent,
     lastIngestedAt: new Date()
   },
   {upsert: true, returnDocument: 'after'}
 )
    const pineconeIndex = pinecone.Index({host: process.env.PINECONE_INDEX_HOST_URL!});
 
 
   console.log("Searching and deleting previous old docs with this url");
  try {
await pineconeIndex.deleteMany({ 
        filter: { 
          source: { "$eq": url } 
        } 
      });
      console.log("Old vectors successfully deleted.");
  } catch (error) {
   console.log("No previous Chunks to Delete");
   
  }
 
  
  const pineDoc = new langchainDoc({
    pageContent: mongoDoc.content,
    metadata: {
      source: mongoDoc.source,
     title: mongoDoc.title,
     mongoId: mongoDoc._id.toString()
    }
  })
 
  const textsplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200
  })
  
  const chunks = await textsplitter.splitDocuments([pineDoc])
  
  if (!chunks || chunks.length === 0) {
    throw new ApiError("Can not split data into chunks", 533)
    
  }

  const cleanedChunks = chunks.map(chunk => {
   delete chunk.metadata.loc
   return chunk
  })
  
 
    const texts = cleanedChunks.map(chunk => chunk.pageContent);
    const metadatas = cleanedChunks.map(chunk => chunk.metadata);

    
    const vectorArrays = await embeddings.embedDocuments(texts);

    if (!vectorArrays || vectorArrays.length === 0) {
      throw new ApiError("Google Gemini failed to generate embeddings.", 500);
    }

    console.log(`Successfully generated ${vectorArrays.length} vectors! Formatting for Pinecone...`);

    const records = vectorArrays.map((vector, index) => {
      return {
        id: `${mongoDoc._id.toString()}-chunk-${index}`, 
        values: vector,
        metadata: {
          ...metadatas[index],
          text: texts[index] 
        }
      };
    });

   
    const MAX_BATCH_SIZE = 50;

    for (let i = 0; i < records.length; i += MAX_BATCH_SIZE) {
      const batch = records.slice(i, i + MAX_BATCH_SIZE);
      console.log(`Upserting batch ${Math.floor(i / MAX_BATCH_SIZE) + 1}...`);
      
      await pineconeIndex.upsert({records: batch}); 
    }

    console.log("Successfully vectorized and uploaded all chunks to Pinecone!");

    return {
      message: "Successfully stored document as chunks in vector db",
      chunkSize: records.length
    };
 } catch (error) {
  console.error("Unable to store vectors")
 }
}
