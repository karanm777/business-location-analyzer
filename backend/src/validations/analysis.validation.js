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

export const suggestionsValidation = [
  body("business")
    .trim()
    .notEmpty()
    .withMessage("Business type is required")
    .isLength({ max: 100 })
    .withMessage("Business type is too long"),
  body("currentDistrict").optional().trim().isLength({ max: 100 }),
  body("excludePincode").optional().trim().isLength({ max: 20 }),
  body("districts")
    .isArray({ min: 1 })
    .withMessage("Districts catalogue is required"),
  body("districts.*.district").notEmpty().withMessage("Each district needs a name"),
  body("districts.*.areas").isArray({ min: 1 }).withMessage("Each district needs areas")
];
