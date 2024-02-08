import express from "express";
import * as DocumentController from "../controllers/ctrl-document";

const router = express.Router();

router.post("/upload", DocumentController.uploadMultipleFiles);

export default router;
