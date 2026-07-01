import { Router } from "express";
import { sendResponse } from "../controller/response.controller.js";
const router = Router()

router.route("/chat").post(sendResponse)

export default router;