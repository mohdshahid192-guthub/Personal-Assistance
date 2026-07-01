import { asyncHandler } from "../utils/asyncHandler.js";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { retrivedContext } from "../services/retrival.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-3.1-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
})

export const sendResponse = asyncHandler(async(req, res) => {
   const userQuery = req.body.query

   const context = await retrivedContext(userQuery)

   const prompt= `You are a helpful Personal Assistance. Use the given context if it matches with user's question generate answers.
  Give advice if the user ask but in limit that it do not voilate any goverment or other policies or it can not be harmfull to that user.
  Do not give any false information or healthcare advice, if the user ask for it then politely refuse to answer that you can't give any healthcare advice.
   
   Context: ${context?.contextString}
   
   my Question: ${userQuery}
   `
   
    const response = await llm.invoke(prompt)

return res.status(200).json(new ApiResponse(200, {answer: response.content, source: context?.source}, "LLM succesfully generated answers"))

}) 