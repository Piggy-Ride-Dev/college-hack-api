import express from "express";
import * as googleAuth from "../utils/googleAuth";

const router = express.Router();

router.get("/auth/google", (req, res) => {
  const url = googleAuth.getGoogleAuthUrl();
  res.redirect(url);
});

router.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;
  try {
    const user = await googleAuth.getGoogleUser(code as string);

    // TODO: Save user to database
    res.send("Authentication successful");
  } catch (error) {
    res.status(500).send("Authentication failed");
  }
});

export default router;
