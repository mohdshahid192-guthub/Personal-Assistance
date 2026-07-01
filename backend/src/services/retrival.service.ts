import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import {pinecone} from "../config/vector.js"
import { ApiError } from "../utils/errorHandler.js";

const embeddings = new GoogleGenerativeAIEmbeddings({
model: "gemini-embedding-2-preview",
  apiKey: process.env.GEMINI_API_KEY,

})

export const retrivedContext = async(query: string, topK: number = 3) => {

try {
  const queryVEctor = await embeddings.embedQuery(query)

  const index = pinecone.Index({host: process.env.PINECONE_INDEX_HOST_URL!})

  const queryResponse = index.query({
    vector: queryVEctor,
    topK: topK,
    includeMetadata: true
  })

  if (!(await queryResponse).matches || (await queryResponse).matches.length === 0) {
   return {
    contextString: "",
    source: []
   }
  }

  const source = (await queryResponse).matches.map((match) => {
     const metadata = match.metadata as Record<string, any>

     return {
      score: match.score,
      title: metadata.title,
      text: metadata.text || ""
     }
  })

  const contextString = source
      .map((source, index) => `--- Source ${index + 1}: ${source.title} ---\n${source.text}`)
      .join("\n\n");

    return {
      contextString,
      source
    };

} catch (error) {
  throw new ApiError("Can not fetch any data from store", 500)
}

}