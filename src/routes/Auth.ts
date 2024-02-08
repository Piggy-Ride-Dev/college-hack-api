import express from "express";
import jwt from "jsonwebtoken";
import { getGoogleAuthUrl, getGoogleAccessToken } from "../services/GoogleAuth";
import { createUserController } from "../controllers/User";

const jwtSecret = process.env.JWT_SECRET;
const router = express.Router();

router.get("/auth/token", (req, res) => {
  const cookieData = req.cookies["college-hack-data"];
  if (!cookieData) {
    return res.status(401).send("Authenticate first");
  }
  res.send(JSON.parse(cookieData));
});

router.get("/auth/google", (req, res) => {
  const url = getGoogleAuthUrl();
  res.redirect(url);
});

router.get("/auth/google/callback", async (req, res) => {
  const authToken = req.query.code;
  try {
    const credentials = await getGoogleAccessToken(authToken as string);
    const user = await createUserController(credentials.access_token as string);
    const jwtToken = jwt.sign({ user: user }, jwtSecret as string, {
      expiresIn: "1h",
    });

    const cookieData = {
      token: jwtToken,
      userId: user.user.id,
      isFirstAccess: user.isFirstAccess,
    };

    res.cookie("college-hack-data", JSON.stringify(cookieData), {
      httpOnly: true,
    });

    const frontendUrl = "http://localhost:3000/";
    // todo: change this to the frontend url

    res.redirect(frontendUrl);
  } catch (error) {
    res.status(500).send("Authentication failed");
  }
});

export default router;
