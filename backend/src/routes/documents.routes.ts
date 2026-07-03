import { Router } from "express";
import { addDocument, addPDF, docURL } from "../controller/ingestion.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
const router = Router()

router.route("/text").post(addDocument)
router.route("/pdf").post(upload.single("document"), addPDF)
router.route("/with-url").post( docURL)

export default router;