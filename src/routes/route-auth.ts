import express from "express";
import { Request, Response } from "express";
import * as AuthController from "../controllers/ctrl-auth";
import { AuthenticationAdapter } from "../adapters/adap-auth";

const router = express.Router();
const authAdapter = new AuthenticationAdapter();
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3333";

interface AuthResponseData {
  url: string;
  cookie: {
    token: string;
    userId: string;
    isFirstAccess: boolean;
  };
}

router.get("/google", async (req: Request, res: Response) => {
  const url = AuthController.getAuthUrl(authAdapter);
  return res.redirect(url);
});

router.get("/google/callback", async (req: Request, res: Response) => {
  const response = await AuthController.authorizeUser(req.query.code as string, authAdapter);
  if (response.isError()) {
    return res.redirect(`${frontendUrl}/login-failed?error=${response.message}`);
  }
  const { cookie } = response.data as AuthResponseData;
  res.cookie("college-hack-data", JSON.stringify(cookie), {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  return res.redirect(
    `${frontendUrl}/login-success?jwt=${cookie.token}&isFirstAccess=${cookie.isFirstAccess}`
  );
});

router.get("/token", async (req: Request, res: Response) => {
  const cookieData = req.cookies["college-hack-data"];
  if (!cookieData) {
    return res.status(401).send("Authenticate first");
  }
  return res.send(JSON.parse(cookieData));
});

export default router;
