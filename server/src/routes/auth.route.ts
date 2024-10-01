import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";

const router = Router();


router.post("/", registerUser);




export default router;