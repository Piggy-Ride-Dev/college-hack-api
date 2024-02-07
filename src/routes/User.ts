import express from "express";
import { mongo } from "mongoose";
import { authenticateToken } from "../middlewares/Auth";
import { getUserController, updateUserController } from "../controllers/User";
import { UserUpdate } from "../models/User";

const router = express.Router();

router.get("/user/:id", authenticateToken, async (req, res) => {
  if (!mongo.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid user id");
  }

  try {
    const user = await getUserController(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.send({ user: user });
  } catch (error) {
    return res.status(500).send(`Internal server error: ${error}`);
  }
});

router.patch("/user/:id", authenticateToken, async (req, res) => {
  if (!mongo.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid user id");
  }

  if (!req.body.user) {
    return res.status(400).send("Invalid user data");
  }

  // todo: validate user data type

  try {
    const user = await updateUserController(
      req.params.id,
      req.body.user as UserUpdate
    );
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.send({ user: user });
  } catch (error) {
    return res.status(500).send(`Internal server error: ${error}`);
  }
});

export default router;
