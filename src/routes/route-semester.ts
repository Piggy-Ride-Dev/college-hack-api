import express from "express";
import { authenticateToken } from "../middlewares/mw-auth";
import * as SemesterController from "../controllers/ctrl-semester";

const router = express.Router();

router.get(
  "/:userId",
  authenticateToken,
  SemesterController.getSemestersByUser
);

export default router;
