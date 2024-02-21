import express from "express";
import { Request, Response } from "express";
import { authorizationMiddleware } from "../middlewares/mw-auth";
import * as UserController from "../controllers/ctrl-user";

const router = express.Router();

router.get(
  "/",
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const response = await UserController.getUser(userId);
    if (response.isError())
      return res.status(response.status).send(response.message);
    else res.send(response.data);
  }
);

router.patch(
  "/",
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const response = await UserController.updateUser(userId, req.body.user);
    if (response.isError())
      return res.status(response.status).send(response.message);
    else res.send(response.data);
  }
);

export default router;
