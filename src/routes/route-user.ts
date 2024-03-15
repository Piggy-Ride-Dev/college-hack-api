import express from "express";
import { Request, Response } from "express";
import { authorizationMiddleware } from "../middlewares/mw-auth";
import * as UserController from "../controllers/ctrl-user";

const router = express.Router();

router.get("/", authorizationMiddleware, async (req: Request, res: Response) => {
  const userId = req.user._id;
  const response = await UserController.getUser(userId);
  if (response.isError()) return res.status(response.status).send(response.message);
  else res.send(response.data);
});

router.patch("/", authorizationMiddleware, async (req: Request, res: Response) => {
  const userId = req.user._id;
  const user = req.body.user;
  if (!user) return res.status(400).send("Missing user object in request body");

  const requiredProperties = ["name", "lastname", "college", "program", "picture"];
  let missingProperties = requiredProperties.filter(
    (prop) => !user.hasOwnProperty(prop) || typeof user[prop] !== "string"
  );
  if (missingProperties.length > 0)
    return res
      .status(400)
      .send(`Missing or invalid properties in user object: ${missingProperties.join(", ")}`);

  const response = await UserController.updateUser(userId, req.body.user);
  if (response.isError()) return res.status(response.status).send(response.message);
  else res.send(response.data);
});

export default router;
