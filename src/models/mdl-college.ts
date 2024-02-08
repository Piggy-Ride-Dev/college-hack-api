import { Schema, model, Document } from "mongoose";

export interface College extends Document {
  id?: string;
  name: string;
}

const collegeSchema = new Schema<College>({
  name: { type: String, required: true },
});

export const College = model("College", collegeSchema);

export function createCollege(college: College): Promise<College> {
  return College.create(college);
}

export function getCollegeById(id: string): Promise<College | null> {
  return College.findById(id);
}

export function getColleges(): Promise<College[]> {
  return College.find();
}
