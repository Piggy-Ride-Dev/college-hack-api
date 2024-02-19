import { mongo } from "mongoose";
import {
  createUser as createUserDB,
  getUserById,
  updateUser as updateUserDB,
  UserCreate,
  UserUpdate,
} from "../models/mdl-user";

export const createUser = async (userData: UserCreate) => {
  const userResp = await createUserDB(userData);
  return { data: userResp };
};

export const getUser = async (userId: string) => {
  if (!mongo.ObjectId.isValid(userId))
    return { status: 400, message: "Invalid ID" };
  try {
    const user = await getUserById(userId);
    if (!user) return { status: 404, message: "User not found" };
    return { data: user };
  } catch (error) {
    return { status: 500, message: `Internal server error: ${error}` };
  }
};

export const updateUser = async (userId: string, userNewData: UserUpdate) => {
  if (!mongo.ObjectId.isValid(userId))
    return { status: 400, message: "Invalid ID" };
  if (!userNewData) return { status: 400, message: "Invalid User Data" };
  try {
    const user = await updateUserDB(userId, userNewData as UserUpdate);
    if (!user) return { status: 404, message: "User not found" };
    return { data: user };
  } catch (error) {
    return { status: 500, message: `Internal server error: ${error}` };
  }
};
