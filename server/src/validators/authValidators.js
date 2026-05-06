import { body } from "express-validator";
import { addressRule, emailRule, nameRule, passwordRule } from "./commonValidators.js";

export const signupRules = [
  nameRule,
  emailRule,
  passwordRule,
  addressRule
];

export const loginRules = [
  emailRule,
  body("password").notEmpty().withMessage("Password is required")
];

export const changePasswordRules = [
  body("currentPassword").notEmpty().withMessage("Current password is required"),
  passwordRule
];
