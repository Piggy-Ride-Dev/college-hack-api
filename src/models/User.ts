import { model, Schema, Document } from "mongoose";

export interface User extends Document {
  id?: string;
  name: string;
  surname: string;
  picture: string;
  googleId: string;
  email: string;
  college: string;
  program: string;
  sections: SectionUser[];
  gpa: number;
}

export interface SectionUser {
  sectionID: string;
  semester: number;
  year: number;
  grade: number;
  isFinished: boolean;
}

export interface UserCreate {
  name: string;
  surname: string;
  email: string;
  googleId: string;
  picture: string;
}

export interface UserUpdate {
  name?: string;
  surname?: string;
  college?: string;
  program?: string;
  picture?: string;
  gpa?: number;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  picture: { type: String, required: false },
  googleId: { type: String, required: true },
  email: { type: String, required: true },
  college: { type: String, required: false },
  program: { type: String, required: false },
  sections: [
    {
      sectionID: { type: String, required: true },
      semester: { type: Number, required: true },
      year: { type: Number, required: true },
      grade: { type: Number, required: true },
      isFinished: { type: Boolean, required: true },
    },
  ],
  gpa: { type: Number, required: false },
});

export const User = model("User", userSchema);

export function createUser(user: UserCreate): Promise<User> {
  return User.create(user);
}

export function getUserByGoogleId(id: string): Promise<User | null> {
  return User.findOne({ googleId: id });
}

export function getUserById(id: string): Promise<User | null> {
  return User.findById(id);
}

export function updateUser(id: string, user: UserUpdate): Promise<User | null> {
  return User.findByIdAndUpdate(id, user);
}
