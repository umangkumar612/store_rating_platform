import express from "express";
import authRoutes from "./authRoutes.js";
import adminRoutes from "./adminRoutes.js";
import storeRoutes from "./storeRoutes.js";
import ownerRoutes from "./ownerRoutes.js";

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ success: true, status: "ok", timestamp: new Date().toISOString() });
});

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/stores", storeRoutes);
router.use("/owner", ownerRoutes);

export default router;
