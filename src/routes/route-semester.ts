import express from "express";
import { authenticateToken } from "../middlewares/auth/mw-auth";
import * as SemesterController from "../gateways/semester/gtw-semester";

const router = express.Router();

router.get(
  "/:userId",
  authenticateToken,
  SemesterController.getSemestersByUser
);

export default router;
