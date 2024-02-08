import { Request, Response } from "express";
import { getSemestersByUserID } from "../models/mdl-semester";
import { mongo } from "mongoose";

export const getSemestersByUser = async (req: Request, res: Response) => {
  if (!mongo.ObjectId.isValid(req.params.userId)) {
    return res.status(400).send("Invalid user id");
  }
  try {
    const semesters = await getSemestersByUserID(req.params.userId);
    if (!semesters) {
      return res.status(404).send("Semesters not found");
    }
    return res.send({ semesters });
  } catch (error) {
    return res.status(500).send(`Internal server error: ${error}`);
  }
};
