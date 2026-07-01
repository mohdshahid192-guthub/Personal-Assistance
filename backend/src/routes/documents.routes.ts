import { Router } from "express";
import { addDocument, addPDF } from "../controller/ingestion.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
const router = Router()

router.route("/text").post(addDocument)
router.route("/pdf").post(upload.single("document"), addPDF)

export default router;