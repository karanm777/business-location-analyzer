import { Router } from "express";
import { sendChatMessage } from "../controllers/chat.controller.js";
import { chatValidation } from "../validations/chat.validation.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/chat", authMiddleware, chatValidation, sendChatMessage);

export default router;
