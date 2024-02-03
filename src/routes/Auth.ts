require("dotenv").config();

import express from "express";
import jwt from "jsonwebtoken";
import { getGoogleAuthUrl, getGoogleAccessToken } from "../services/GoogleAuth";
import { authenticateToken } from "../middlewares/Auth";
import { createUser, getUser } from "../controllers/User";

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
    const user = await createUser(credentials.access_token as string);
    const jwtToken = jwt.sign({ user: user }, jwtSecret as string, {
      expiresIn: "1h",
    });
    res.send({ token: jwtToken, user: user });
  } catch (error) {
    res.status(500).send("Authentication failed");
  }
});

router.get("/user/:id", authenticateToken, async (req, res) => {
  const user = await getUser(req.params.id);
  // todo retornar 404 se o usuário não existir
  return res.send({ user: user });
});

export default router;
