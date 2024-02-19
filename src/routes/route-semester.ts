import express from "express";
import { authorizationMiddleware } from "../middlewares/mw-auth";
import * as SemesterController from "../controllers/ctrl-semester";

const router = express.Router();

router.get(
  "/:userId",
  authorizationMiddleware,
  SemesterController.getSemestersByUser
);

export default router;
