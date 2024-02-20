import { model, Schema, Document } from "mongoose";

export interface User extends Document {
  id?: string;
  name: string;
  lastname: string;
  picture: string;
  googleId: string;
  email: string;
  college: string;
  program: string;
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
  college?: string;
  program?: string;
  picture?: string;
  gpa?: number;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  picture: { type: String, required: false },
  googleId: { type: String, required: true },
  email: { type: String, required: true },
  college: { type: String, required: false },
  program: { type: String, required: false },
  gpa: { type: Number, required: false },
});

export const User = model("User", userSchema);

export function create(user: UserCreate): Promise<User> {
  return User.create(user);
}

export function getById(id: string): Promise<User | null> {
  return User.findById(id);
}

export function getByEmail(email: string): Promise<User | null> {
  return User.findOne({ email: email });
}

export function update(id: string, user: UserUpdate): Promise<User | null> {
  return User.findByIdAndUpdate(id, user);
}
