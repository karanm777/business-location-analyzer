import { body } from "express-validator";

export const analyzeValidation = [
  body("pincode")
    .trim()
    .matches(/^[0-9]{4,10}$/)
    .withMessage("Pincode must be numeric (4-10 digits)"),
  body("business")
    .trim()
    .notEmpty()
    .withMessage("Business type is required")
    .isLength({ max: 100 })
    .withMessage("Business type is too long")
];
