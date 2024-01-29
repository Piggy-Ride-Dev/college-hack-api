import mongoose from "mongoose";

export interface SectionUser {
  sectionID: string;
  semester: number;
  year: number;
  grade: number;
  isFinished: boolean;
}
export interface User {
  id?: string;
  name: string;
  googleId: string;
  email: string;
  hashedPassword: string;
  college: string;
  program: string;
  sections: SectionUser[];
  gpa: number;
}

const userSchema = new mongoose.Schema<User>({});
export const User = mongoose.model("User", userSchema);
