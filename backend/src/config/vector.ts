import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from '@langchain/pinecone';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { ApiError } from '../utils/errorHandler.js';


export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

export const embeddings = new GoogleGenerativeAIEmbeddings({model: "gemini-embedding-2-preview",
  apiKey: process.env.GEMINI_API_KEY
});

let vectorStore : PineconeStore | null = null;



export const connectVectorDB = async () => {
try {
    const index = pinecone.Index({host: process.env.PINECONE_INDEX_HOST_URL!});
   vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
  });
  console.log("Vector Database client ready.");

  return vectorStore;
} catch (error) {
  throw new ApiError("Vector Database client connection error", 503)
}
};

export const getVectorStore = () => {
  if(!vectorStore){
    throw new ApiError("Vector Store is not initialized yet. Database is still booting", 501)
  }
  return vectorStore
}