import express, { urlencoded } from "express";
import { ApiError } from "./utils/errorHandler.js";
import documentRouter from "./routes/documents.routes.js"
import cors from 'cors'
import responseRouter from "./routes/response.routes.js"
const app = express()

app.use(cors({
  origin: `${process.env.CORS_ORIGIN}`,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));


//app routes

app.use("/api/v1/ingest/document", documentRouter)
app.use("/api/v1/retrive/response", responseRouter)
export default app