import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createUser } from "../user/gtw-user";
import {
  getGoogleAuthUrl,
  getGoogleAccessToken,
} from "../../services/svc-google-auth";

const jwtSecret = process.env.JWT_SECRET;

export const getToken = (req: Request, res: Response) => {
  const cookieData = req.cookies["college-hack-data"];
  if (!cookieData) {
    return res.status(401).send("Authenticate first");
  }
  res.send(JSON.parse(cookieData));
};

export const redirectToGoogleAuth = (req: Request, res: Response) => {
  const url = getGoogleAuthUrl();
  res.redirect(url);
};

export const handleGoogleCallback = async (req: Request, res: Response) => {
  const authToken = req.query.code;
  try {
    const credentials = await getGoogleAccessToken(authToken as string);
    // Passar o objeto formatado
    const user = await createUser(credentials.access_token as string);
    const jwtToken = jwt.sign({ user: user }, jwtSecret as string, {
      expiresIn: "24h",
    });

    const cookieData = {
      token: jwtToken,
      userId: user.userDB.id,
      isFirstAccess: user.isFirstAccess,
    };

    res.cookie("college-hack-data", JSON.stringify(cookieData), {
      httpOnly: true,
      secure: true,
    });

    const frontendUrl = process.env.FRONTEND_URL as string;

    res.redirect(frontendUrl);
  } catch (error) {
    res.status(500).send("Authentication failed");
  }
};
