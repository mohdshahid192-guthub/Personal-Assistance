import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from '@langchain/pinecone';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';


export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const embeddings = new GoogleGenerativeAIEmbeddings({model: "embedding-001",
  
  apiKey: process.env.GEMINI_API_KEY
});

export const connectVectorDB = async () => {
  const index = pinecone.Index(process.env.PINECONE_INDEX!);
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
  });
  console.log("Vector Database client ready.");

  return vectorStore;
};