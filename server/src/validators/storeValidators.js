import { body } from "express-validator";
import { emailRule, nameRule } from "./commonValidators.js";

export const createStoreRules = [
  nameRule,
  emailRule.optional({ nullable: true, checkFalsy: true }),
  body("address").trim().notEmpty().withMessage("Address is required").isLength({ max: 400 }),
  body("ownerId").optional({ nullable: true, checkFalsy: true }).isUUID()
];

export const updateStoreRules = [
  nameRule.optional(),
  emailRule.optional({ nullable: true, checkFalsy: true }),
  body("address").optional({ nullable: true, checkFalsy: true }).trim().isLength({ max: 400 }),
  body("ownerId").optional({ nullable: true, checkFalsy: true }).isUUID()
];

export const ratingRules = [
  body("rating").toInt().isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
  body("comment").optional({ nullable: true, checkFalsy: true }).trim().isLength({ max: 500 })
];
