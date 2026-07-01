import { Document, IDocument } from "../model/document.model.js";
import {pinecone} from "../config/vector.js"
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { HydratedDocument } from "mongoose";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document as LangchainDocument } from "langchain";
import { ApiError } from "../utils/errorHandler.js";



const embeddings = new GoogleGenerativeAIEmbeddings({model: "gemini-embedding-2-preview",
  apiKey: process.env.GEMINI_API_KEY,
  
});

export const ingestDocument = async(title: string, content: string)  => {

const doc:HydratedDocument<IDocument> = await Document.create({title, content})

const vector = await embeddings.embedQuery(content);

await pinecone.Index({host: process.env.PINECONE_INDEX_HOST_URL!}).upsert({
  records: [{
  id: doc._id.toString(),
  values: vector,
  metadata: {
    title: doc.title
  }
}]
})


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

   const mongoDoc: HydratedDocument<IDocument> = await Document.create({
    title,
    content: fullText
   })

   if (!mongoDoc) {
    throw new ApiError("Can not store in MongoDB", 500)
   }

   const textsplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200
   })

   const chunkDocuments = await textsplitter.createDocuments(
    [fullText], 
    [{title: mongoDoc.title, mongoId: mongoDoc._id.toString() }]
   )

   const textToEmbed = chunkDocuments.map(doc => doc.pageContent)
   const vector = await embeddings.embedDocuments(textToEmbed)

   const pineconeDoc = chunkDocuments.map((chunk, index) => ({
    id: `${mongoDoc._id.toString()}-chunck-${index}`,
    values: vector[index],
    metadata:{
      title: mongoDoc.title,
      mongoId: mongoDoc._id.toString(),
      text: chunk.pageContent
    }
   }))

   await pinecone.Index({host: process.env.PINECONE_INDEX_HOST_URL!}).upsert({records: pineconeDoc})
    
   return {
    message: "PDF successfully ingested and vectorized",
      documentId: mongoDoc._id,
      chunksCreated: pineconeDoc.length
   }
  } catch (error) {
    throw new ApiError("Can not ingest Pdf due to internal error", 500)
  }
}