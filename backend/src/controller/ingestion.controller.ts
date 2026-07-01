import { ApiError } from "../utils/errorHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ingestDocument, ingestPDF } from "../services/ingestion.service.js";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { error } from "node:console";
import fs from "fs"
import { unlinkSync } from "node:fs";

interface addDocumentBody {
  title: string
  content: string
}

const addDocument = asyncHandler(async (req: Request<{}, {}, addDocumentBody>, res: Response) => {
  const { title, content } = req.body
  if (!title?.trim() || !content?.trim()  ) {
     throw new ApiError("Please Provide The Details", 400)
  }
  const doc = await ingestDocument(title, content)

  if(!doc){
    throw new ApiError("Ingestion error Occured", 500)
  }
  return res.status(200).json(new ApiResponse(201, doc, "Ingestion successfull"))

});

const addPDF = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError("Please share a pdf file", 400)
  }

const filePath = req.file.path
const title = req.body.title || req.file.originalname

 try {

  console.log(`Ingesting file ${title}...`);
const doc = await ingestPDF(filePath, title)

if (!doc) {
  throw new ApiError("Error occured while ingestion", 500)
}

return res.status(200).json(new ApiResponse(200, doc, "Successflly ingested PDF"))

 } catch (error) {
   throw new ApiError("Internal error occured while ingesting file", 500);
   
 }finally{
     if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath)
      } catch (unlinkError) {
        console.error("Unable to delete temporary file", unlinkError)
        
      }
     }
 }

});

export {
  addDocument,
  addPDF
}