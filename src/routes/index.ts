import express from "express";
import userRoutes from "./route-user";
import authRoutes from "./route-auth";
import semesterRoutes from "./route-semester";
import institutionRoutes from "./route-institution";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/semester", semesterRoutes);
router.use("/institution", institutionRoutes);

export default router;
