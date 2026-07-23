import { validationResult } from "express-validator";
import { generateChatReply } from "../services/ai.service.js";
import { success, failure } from "../utils/response.js";

export const sendChatMessage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return failure(res, 400, "Validation failed", errors.array());
    }

    const { message, history, context } = req.body;

    const reply = await generateChatReply(message, history, context);

    return success(res, 200, "Reply generated successfully", { reply });
  } catch (error) {
    next(error);
  }
};
