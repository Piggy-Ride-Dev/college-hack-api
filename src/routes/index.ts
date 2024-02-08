import express from "express";
import userRoutes from "./route-user";
import authRoutes from "./route-auth";
import semesterRoutes from "./route-semester";
import documentRoutes from "./route-document";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/semester", semesterRoutes);
router.use("/document", documentRoutes);

export default router;
