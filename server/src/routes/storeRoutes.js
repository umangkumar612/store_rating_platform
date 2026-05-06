import express from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { browseStores, getStore, myRatings, rateStore } from "../controllers/storeController.js";
import { idParam, paginationRules } from "../validators/commonValidators.js";
import { ratingRules } from "../validators/storeValidators.js";

const router = express.Router();

router.use(authenticate, authorize("user", "admin"));

router.get("/", paginationRules, validate, browseStores);
router.get("/my-ratings", myRatings);
router.get("/:id", idParam, validate, getStore);
router.post("/:id/ratings", idParam, ratingRules, validate, rateStore);

export default router;
