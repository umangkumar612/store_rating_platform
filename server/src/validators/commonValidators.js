import { body, param, query } from "express-validator";

export const passwordRule = body("password")
  .isLength({ min: 8, max: 16 }).withMessage("Password must be 8 to 16 characters")
  .matches(/[A-Z]/).withMessage("Password must include one uppercase letter")
  .matches(/[!@#$%^&*(),.?":{}|<>_\-+=;'/\\[\]`~]/).withMessage("Password must include one special character");

export const nameRule = body("name")
  .trim()
  .isLength({ min: 3, max: 50 })
  .withMessage("Name must be 20 to 60 characters");

export const addressRule = body("address")
  .optional({ nullable: true, checkFalsy: true })
  .trim()
  .isLength({ max: 400 })
  .withMessage("Address must be at most 400 characters");

export const emailRule = body("email").trim().isEmail().normalizeEmail().withMessage("Valid email is required");

export const idParam = param("id").isUUID().withMessage("A valid id is required");

export const paginationRules = [
  query("page").optional().toInt().isInt({ min: 1 }),
  query("limit").optional().toInt().isInt({ min: 1, max: 100 }),
  query("order").optional().isIn(["ASC", "DESC", "asc", "desc"]),
  query("search").optional().trim().isLength({ max: 120 })
];
