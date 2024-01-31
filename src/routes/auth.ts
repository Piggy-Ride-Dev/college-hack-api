require("dotenv").config();

import express from "express";
import jwt from "jsonwebtoken";
import { getGoogleAuthUrl, getGoogleAccessToken } from "../services/googleAuth";
import { authenticateToken } from "../middlewares/auth";
import { createUser, getUser } from "../controllers/User";

const jwtSecret = process.env.JWT_SECRET;
const router = express.Router();

router.get("/auth/google", (req, res) => {
  const url = getGoogleAuthUrl();
  res.redirect(url);
});

router.get("/auth/google/callback", async (req, res) => {
  const authToken = req.query.code;
  try {
    const credentials = await getGoogleAccessToken(authToken as string);
    const user = await createUser(credentials.access_token as string);
    const jwtToken = jwt.sign({ user: user }, jwtSecret as string, {
      expiresIn: "1h",
    });
    res.send({ jwtToken: jwtToken, user: user });
  } catch (error) {
    res.status(500).send("Authentication failed");
  }
});

router.get("/user/:id", authenticateToken, async (req, res) => {
  const user = await getUser(req.params.id);
  return res.send(user);
});

export default router;
