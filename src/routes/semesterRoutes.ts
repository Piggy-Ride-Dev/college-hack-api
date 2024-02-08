import express from "express";
import { mongo } from "mongoose";
import { authenticateToken } from "../middlewares/Auth";
import { getSemestersController } from "../controllers/Semester";

const router = express.Router();

router.get("/:userId", authenticateToken, async (req, res) => {
  if (!mongo.ObjectId.isValid(req.params.userId)) {
    return res.status(400).send("Invalid user id");
  }
  try {
    const semesters = await getSemestersController(req.params.userId);
    if (!semesters) {
      return res.status(404).send("Semesters not found");
    }
    return res.send({ semesters });
  } catch (error) {
    return res.status(500).send(`Internal server error: ${error}`);
  }
});

export default router;
