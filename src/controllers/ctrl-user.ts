import { Request, Response } from "express";
import {
  createUser as createUserDB,
  getUserByGoogleId,
  getUserById,
  updateUser as updateUserDB,
  UserUpdate,
} from "../models/mdl-user";
import { getGoogleUserInfo } from "../services/svc-google-auth";
import { mongo } from "mongoose";

export const createUser = async (accessToken: string) => {
  const googleUserInfo = await getGoogleUserInfo(accessToken);
  let user = await getUserByGoogleId(googleUserInfo.id);
  let isFirstAccess = false;

  if (!user) {
    const userResp = await createUserDB({
      name: googleUserInfo.given_name,
      surname: googleUserInfo.family_name,
      picture: googleUserInfo.picture,
      googleId: googleUserInfo.id,
      email: googleUserInfo.email,
    });
    user = userResp;
    isFirstAccess = true;
  }

  return { user, isFirstAccess };
};

export const getUser = async (req: Request, res: Response) => {
  if (!mongo.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid user id");
  }

  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.send({ user: user });
  } catch (error) {
    return res.status(500).send(`Internal server error: ${error}`);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  if (!mongo.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid user id");
  }

  if (!req.body.user) {
    return res.status(400).send("Invalid user data");
  }

  try {
    const user = await updateUserDB(req.params.id, req.body.user as UserUpdate);
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.send({ user: user });
  } catch (error) {
    return res.status(500).send(`Internal server error: ${error}`);
  }
};
