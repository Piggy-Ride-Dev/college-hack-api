require("dotenv").config();

import express from "express";
import jwt from "jsonwebtoken";
import {
  getGoogleAuthUrl,
  getUserInfo,
  getGoogleAccessToken,
} from "../utils/googleAuth";
import { authenticateToken } from "../middlewares/auth";
import { createUser, getUserByGoogleId } from "../models/User";

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
    const { access_token: accessToken, refresh_token: refreshToken } =
      credentials;

    const user = await getUserInfo(accessToken as string);
    let internalUser = await getUserByGoogleId(user.id);

    if (!internalUser) {
      const userResp = await createUser({
        name: user.given_name,
        surname: user.family_name,
        picture: user.picture,
        googleId: user.id,
        email: user.email,
      });
      internalUser = userResp;
    }

    const jwtToken = jwt.sign({ user: internalUser }, jwtSecret as string, {
      expiresIn: "1h",
    });

    res.send({ jwtToken });
  } catch (error) {
    console.error("Error during Google auth callback:", error);
    res.status(500).send("Authentication failed");
  }
});

router.get("/protected", authenticateToken, (req, res) => {
  // If the user is authenticated, this code will be executed
  res.send("You can see this because you are authenticated");
});

export default router;
