import express from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { dashboard, ratingsForStore } from "../controllers/ownerController.js";
import { idParam } from "../validators/commonValidators.js";

const router = express.Router();

router.use(authenticate, authorize("owner", "admin"));

router.get("/dashboard", dashboard);
router.get("/stores/:id/ratings", idParam, validate, ratingsForStore);

export default router;
