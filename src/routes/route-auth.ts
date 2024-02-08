import express from "express";
import * as AuthController from "../controllers/ctrl-auth";

const router = express.Router();

router.get("/auth/token", AuthController.getToken);

router.get("/auth/google", AuthController.redirectToGoogleAuth);

router.get("/auth/google/callback", AuthController.handleGoogleCallback);

export default router;
