require("dotenv").config();

import express from "express";
import jwt from "jsonwebtoken";
import { getGoogleAuthUrl, getGoogleAccessToken } from "../services/GoogleAuth";
import { createUserController } from "../controllers/User";

const jwtSecret = process.env.JWT_SECRET;
const router = express.Router();

router.get("/auth/google", (req, res) => {
  const url = getGoogleAuthUrl();
  res.send({ url: url });
});

router.get("/auth/google/callback", async (req, res) => {
  const authToken = req.query.code;
  try {
    const credentials = await getGoogleAccessToken(authToken as string);
    const user = await createUserController(credentials.access_token as string);
    const jwtToken = jwt.sign({ user: user }, jwtSecret as string, {
      expiresIn: "1h",
    });
    res.send({ token: jwtToken, ...user });
  } catch (error) {
    res.status(500).send("Authentication failed");
  }
});

export default router;
