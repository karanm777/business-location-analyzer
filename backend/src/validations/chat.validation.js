import { body } from "express-validator";

export const chatValidation = [
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ max: 500 })
    .withMessage("Message is too long (max 500 characters)"),
  body("history").optional().isArray().withMessage("History must be an array")
];
