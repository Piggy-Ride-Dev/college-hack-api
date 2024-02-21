import { Schema, model, Document } from "mongoose";

export interface Program extends Document {
  id?: string;
  name: string;
  collegeID: Schema.Types.ObjectId;
  code: string;
  numOfSemesters?: number;
}

const programSchema = new Schema<Program>({
  name: { type: String, required: true },
  collegeID: { type: Schema.Types.ObjectId, ref: "College", required: true },
  code: { type: String, required: true },
  numOfSemesters: { type: Number, required: false },
});

export const Program = model("Program", programSchema);

export interface College extends Document {
  id?: string;
  name: string;
}

const collegeSchema = new Schema<College>({
  name: { type: String, required: true },
});

export const College = model("College", collegeSchema);

export function getCollegeById(id: string): Promise<College | null> {
  return College.findById(id);
}

export function getProgramById(id: string): Promise<Program | null> {
  return Program.findById(id);
}

export function getProgramsPerCollege(): Promise<Program[]> {
  return Program.find().populate("collegeID");
}
