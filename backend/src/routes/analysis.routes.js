import { Router } from "express";
import { analyzeLocation, getHistory, deleteAnalysis } from "../controllers/analysis.controller.js";
import { analyzeValidation } from "../validations/analysis.validation.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/analyze", authMiddleware, analyzeValidation, analyzeLocation);
router.get("/history", authMiddleware, getHistory);
router.delete("/history/:id", authMiddleware, deleteAnalysis);

export default router;
