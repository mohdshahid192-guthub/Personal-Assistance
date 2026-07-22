import { Router } from "express";
import { userLogin, userLogout, userRegistration } from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/userAuth.middleware.js";
const router = Router()

router.route("/signup").post(userRegistration)
router.route("/login").post(userLogin)
router.route("/logout").post(verifyJWT, userLogout)

export default router;