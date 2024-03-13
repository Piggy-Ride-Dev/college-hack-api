import { model, Schema, Document, Types } from "mongoose";

export interface User extends Document {
  _id?: string;
  name: string;
  lastname: string;
  picture: string;
  googleId: string;
  email: string;
  college: Types.ObjectId;
  program: Types.ObjectId;
  gpa: number;
}

export interface UserCreate {
  name: string;
  lastname: string;
  email: string;
  googleId: string;
  picture: string;
}

export interface UserUpdate {
  name?: string;
  lastname?: string;
  college?: Types.ObjectId;
  program?: Types.ObjectId;
  picture?: string;
  gpa?: number;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  picture: { type: String, required: false },
  googleId: { type: String, required: true },
  email: { type: String, required: true },
  college: { type: Schema.Types.ObjectId, required: false },
  program: { type: Schema.Types.ObjectId, required: false },
  gpa: { type: Number, required: false },
});

export const User = model("User", userSchema);

export function create(user: UserCreate): Promise<User> {
  return User.create(user);
}

export function getById(id: string): Promise<User | null> {
  return User.findById(id).populate("college").populate("program");
}

export function getByEmail(email: string): Promise<User | null> {
  return User.findOne({ email: email }).populate("college").populate("program");
}

export function update(id: string, user: UserUpdate): Promise<User | null> {
  return User.findByIdAndUpdate(id, user).populate("college").populate("program");
}
