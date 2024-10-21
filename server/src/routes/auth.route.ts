import { Router } from "express";
import {
  loginUser,
  registerUser,
  verifyEmail,
  verifyEmailError,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email", verifyEmail);
router.get("/verify-email-error", verifyEmailError);

export default router;
