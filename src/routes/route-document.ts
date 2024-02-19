import express from "express";
import * as DocumentController from "../controllers/ctrl-document";
import { authorizationMiddleware } from "../middlewares/mw-auth";

const router = express.Router();

router.post(
  "/upload",
  authorizationMiddleware,
  DocumentController.uploadMultipleFiles
);

export default router;
