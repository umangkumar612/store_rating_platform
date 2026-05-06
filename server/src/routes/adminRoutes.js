import express from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  addStore,
  addUser,
  editStore,
  editUser,
  getStore,
  getStores,
  getUser,
  getUsers,
  removeStore,
  removeUser,
  stats,
  storeRatings
} from "../controllers/adminController.js";
import { idParam, paginationRules } from "../validators/commonValidators.js";
import { createStoreRules, updateStoreRules } from "../validators/storeValidators.js";
import { createUserRules, updateUserRules } from "../validators/userValidators.js";

const router = express.Router();

router.use(authenticate, authorize("admin"));

router.get("/stats", stats);
router.get("/users", paginationRules, validate, getUsers);
router.post("/users", createUserRules, validate, addUser);
router.get("/users/:id", idParam, validate, getUser);
router.patch("/users/:id", idParam, updateUserRules, validate, editUser);
router.delete("/users/:id", idParam, validate, removeUser);

router.get("/stores", paginationRules, validate, getStores);
router.post("/stores", createStoreRules, validate, addStore);
router.get("/stores/:id", idParam, validate, getStore);
router.patch("/stores/:id", idParam, updateStoreRules, validate, editStore);
router.delete("/stores/:id", idParam, validate, removeStore);
router.get("/stores/:id/ratings", idParam, validate, storeRatings);

export default router;
