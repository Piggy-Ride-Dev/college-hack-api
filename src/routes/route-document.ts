import express from "express";
import * as DocumentController from "../gateways/document/gtw-document";

const router = express.Router();

router.post("/upload", DocumentController.uploadMultipleFiles);

export default router;
