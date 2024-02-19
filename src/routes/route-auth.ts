import express from "express";
import { Request, Response } from "express";
import * as AuthController from "../controllers/ctrl-auth";
import { AuthenticationAdapter } from "../adapters/adap-auth";

const router = express.Router();
const authAdapter = new AuthenticationAdapter();

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
  const response = await AuthController.authorizeUser(
    req.query.code as string,
    authAdapter
  );
  if (response.isError()) {
    return res.status(response.status).send(response.message);
  }
  const { cookie } = response.data as AuthResponseData;
  res.cookie("college-hack-data", JSON.stringify(cookie), {
    httpOnly: true,
    secure: true,
  });
  return res.send(response);
});

router.get("/token", async (req: Request, res: Response) => {
  const cookieData = req.cookies["college-hack-data"];
  if (!cookieData) {
    return res.status(401).send("Authenticate first");
  }
  return res.send(JSON.parse(cookieData));
});

export default router;
