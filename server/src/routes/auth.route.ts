import { Router } from "express";
import { registerUser, verifyEmail } from "../controllers/auth.controller.js";

const router = Router();


router.post("/", registerUser);
router.get("/verify-email", verifyEmail);




export default router;