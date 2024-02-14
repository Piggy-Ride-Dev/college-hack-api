import express from "express";
import * as AuthController from "../gateways/auth/gtw-auth";

const router = express.Router();

router.get("/token", AuthController.getToken);
router.get("/google", AuthController.redirectToGoogleAuth);
router.get("/google/callback", AuthController.handleGoogleCallback);

export default router;
