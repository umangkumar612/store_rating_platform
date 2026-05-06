import express from "express";
import { authenticate } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { changePassword, login, me, signup } from "../controllers/authController.js";
import { changePasswordRules, loginRules, signupRules } from "../validators/authValidators.js";

const router = express.Router();

router.post("/signup", signupRules, validate, signup);
router.post("/login", loginRules, validate, login);
router.get("/me", authenticate, me);
router.patch("/change-password", authenticate, changePasswordRules, validate, changePassword);
router.post("/logout", authenticate, (req, res) => res.json({ success: true, message: "Logged out" }));

export default router;
