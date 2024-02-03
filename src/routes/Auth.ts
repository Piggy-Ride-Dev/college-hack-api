require("dotenv").config();

import express from "express";
import jwt from "jsonwebtoken";
import { mongo } from "mongoose";
import { getGoogleAuthUrl, getGoogleAccessToken } from "../services/GoogleAuth";
import { authenticateToken } from "../middlewares/Auth";
import { createUserController, getUserController } from "../controllers/User";

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
    res.send({ token: jwtToken, user: user });
  } catch (error) {
    res.status(500).send("Authentication failed");
  }
});

router.get("/user/:id", authenticateToken, async (req, res) => {
  if (!mongo.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid user id");
  }

  try {
    const user = await getUserController(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.send({ user: user });
  } catch (error) {
    return res.status(500).send(`Internal server error: ${error}`);
  }
});

export default router;
