import express from "express";
import googleAuthClient from "../utils/googleAuth";

const router = express.Router();

router.get("/auth/google", (req, res) => {
  const url = googleAuthClient.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });
  res.redirect(url);
});

router.get("/auth/google/callback", async (req, res) => {
  try {
    const { tokens } = await googleAuthClient.getToken(
      req.query.code as string
    );
    googleAuthClient.setCredentials(tokens);

    // Here, you might want to create or update the user in your database
    // Then create a JWT token and send it back to the client

    res.redirect("/some-frontend-route");
  } catch (error) {
    console.error("Error getting tokens:", error);
    res.status(500).send("Authentication failed");
  }
});

export default router;
