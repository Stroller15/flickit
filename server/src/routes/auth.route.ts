import { Router } from "express";
import {
  registerUser,
  verifyEmail,
  verifyEmailError,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerUser);
router.get("/verify-email", verifyEmail);
router.get("/verify-email-error", verifyEmailError);

export default router;
