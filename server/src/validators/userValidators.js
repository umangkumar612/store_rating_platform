import { body } from "express-validator";
import { addressRule, emailRule, nameRule } from "./commonValidators.js";

export const createUserRules = [
  nameRule,
  emailRule,
  body("password")
    .isLength({ min: 8, max: 16 })
    .matches(/[A-Z]/)
    .matches(/[!@#$%^&*(),.?":{}|<>_\-+=;'/\\[\]`~]/),
  addressRule,
  body("role").isIn(["admin", "user", "owner"])
];

export const updateUserRules = [
  nameRule.optional(),
  emailRule.optional(),
  addressRule,
  body("role").optional().isIn(["admin", "user", "owner"]),
  body("isActive").optional().isBoolean()
];
