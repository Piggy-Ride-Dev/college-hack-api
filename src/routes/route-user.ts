import express from "express";
import { authenticateToken } from "../middlewares/mw-auth";
import * as UserController from "../controllers/ctrl-user";

const router = express.Router();

router.get("/:id", authenticateToken, UserController.getUser);
router.patch("/:id", authenticateToken, UserController.updateUser);

export default router;
