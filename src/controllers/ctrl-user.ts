import { mongo } from "mongoose";
import * as UserModel from "../models/mdl-user";
import { ControllerResponse } from "../utils/util-response";

export interface UserResponseData {
  user: UserModel.User;
  isFirstAccess: boolean;
}

export const createUser = async (userData: UserModel.UserCreate) => {
  const userResp = await UserModel.create(userData);
  return ControllerResponse.success(userResp);
};

export const getUser = async (userId: string) => {
  if (!mongo.ObjectId.isValid(userId)) return ControllerResponse.error(400, "Invalid ID");

  try {
    const user = await UserModel.getById(userId);
    if (!user) return ControllerResponse.error(404, "User not found");
    return ControllerResponse.success(user);
  } catch (error) {
    return ControllerResponse.error(500, `Internal server error: ${error}`);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await UserModel.getByEmail(email);
    return ControllerResponse.success(user);
  } catch (error) {
    return ControllerResponse.error(500, `Internal server error: ${error}`);
  }
};

export const updateUser = async (userId: string, userNewData: UserModel.UserUpdate) => {
  if (!mongo.ObjectId.isValid(userId)) return ControllerResponse.error(400, "Invalid ID");
  if (!userNewData) return ControllerResponse.error(400, "Invalid User Data");

  try {
    const user = await UserModel.update(userId, userNewData);
    if (!user) return ControllerResponse.error(404, "User not found");
    return ControllerResponse.success(user);
  } catch (error) {
    return ControllerResponse.error(500, `Internal server error: ${error}`);
  }
};

export async function findOrCreateUser(
  email: string,
  name: string,
  lastname: string,
  googleId: string,
  picture: string
) {
  let userResponse = await getUserByEmail(email);
  let isFirstAccess = false;

  if (userResponse.data === null) {
    const createUserResponse = await createUser({
      email: email,
      name: name,
      lastname: lastname,
      googleId: googleId,
      picture: picture,
    });
    userResponse = ControllerResponse.success(createUserResponse.data);
    isFirstAccess = true;
  }
  return ControllerResponse.success({ user: userResponse.data, isFirstAccess });
}
