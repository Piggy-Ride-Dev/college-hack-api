import express from "express";
import { authenticateToken } from "../middlewares/auth/mw-auth";
import * as UserGateway from "../gateways/user/gtw-user";

const router = express.Router();

router.get("/:id", authenticateToken, async (req, res) => {
  const response = await UserGateway.get(req.params.id);
  return res.status(response.code).json(response.data);
});

router.patch("/:id", authenticateToken, async (req, res) => {
  const response = await UserGateway.patch(req.params.id, req.body.user);
  return res.status(response.code).json(response.data);
});

export default router;
