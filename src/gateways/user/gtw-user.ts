import { mongo } from "mongoose";
import * as GoogleAuth from "../../services/svc-google-auth";
import * as UserRepository from "../../repository/rep-user";
import { type UserUpdate } from "../../entities/ent-user";

export const post = async (accessToken: string) => {
  const googleUserInfo = await GoogleAuth.getUserInfo(accessToken);
  let userDB = await UserRepository.getByGoogleId(googleUserInfo.id);
  let isFirstAccess = false;

  if (!userDB) {
    const userResp = await UserRepository.create({
      name: googleUserInfo.given_name,
      surname: googleUserInfo.family_name,
      picture: googleUserInfo.picture,
      googleId: googleUserInfo.id,
      email: googleUserInfo.email,
    });
    userDB = userResp;
    isFirstAccess = true;
  }

  return { userDB, isFirstAccess };
};

export const get = async (userId: string) => {
  if (!mongo.ObjectId.isValid(userId)) {
    return { data: "Invalid user id", code: 400 };
  }
  try {
    const user = await UserRepository.get(userId);
    if (!user) {
      return { data: "User not found", code: 404 };
    }
    return { data: user, code: 200 };
  } catch (error) {
    return { data: `Internal server error: ${error}`, code: 500 };
  }
};

export const patch = async (userId: string, user: UserUpdate) => {
  if (!mongo.ObjectId.isValid(userId)) {
    return { data: "Invalid user id", code: 400 };
  }

  if (!user) {
    return { data: "Invalid user object", code: 400 };
  }

  try {
    const updatedUser = await UserRepository.update(userId, user as UserUpdate);
    if (!user) {
      return { data: "User not found", code: 400 };
    }
    return { data: updatedUser, code: 200 };
  } catch (error) {
    return { data: `Internal server error: ${error}`, code: 500 };
  }
};
