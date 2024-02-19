import express from "express";
import { Request, Response } from "express";
import { authorizationMiddleware } from "../middlewares/mw-auth";
import * as UserController from "../controllers/ctrl-user";

const router = express.Router();

router.get(
  "/:id",
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    const response = await UserController.getUser(req.params.id);
    if (response.status) res.status(response.status).send(response.message);
    else res.send(response);
  }
);
router.patch(
  "/:id",
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    const response = await UserController.updateUser(
      req.params.id,
      req.body.user
    );
    if (response.status) res.status(response.status).send(response.message);
    else res.send(response);
  }
);

export default router;
