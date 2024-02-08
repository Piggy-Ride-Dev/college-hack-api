import express from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import semesterRoutes from "./semesterRoutes";
import documentRoutes from "./documentRoutes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/semester", semesterRoutes);
router.use("/document", documentRoutes);

export default router;
