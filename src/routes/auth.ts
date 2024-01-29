import express from "express";
import {
  getGoogleAuthUrl,
  getUserInfo,
  getGoogleAccessToken,
} from "../utils/googleAuth";
import { createUser, getUserByGoogleId } from "../models/User";

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
    const userInDb = await getUserByGoogleId(user.id);

    if (!userInDb) {
      await createUser({
        name: user.given_name,
        surname: user.family_name,
        picture: user.picture,
        googleId: user.id,
        email: user.email,
      });
    }

    res.send("Authentication successful");
  } catch (error) {
    console.error("Error during Google auth callback:", error);
    res.status(500).send("Authentication failed");
  }
});

export default router;
