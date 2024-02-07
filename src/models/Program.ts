import { Schema, model, Document } from "mongoose";

export interface Program extends Document {
  id?: string;
  name: string;
  collegeID: string;
  code: string;
  numOfSemesters: number;
}

const programSchema = new Schema<Program>({
  name: { type: String, required: true },
  collegeID: { type: String, required: true },
  code: { type: String, required: true },
  numOfSemesters: { type: Number, required: true },
});

export const Program = model("Program", programSchema);

export function createProgram(program: Program): Promise<Program> {
  return Program.create(program);
}

export function getProgramById(id: string): Promise<Program | null> {
  return Program.findById(id);
}

export function getProgramsByCollegeID(collegeID: string): Promise<Program[]> {
  return Program.find({ collegeID });
}

export function getPrograms(): Promise<Program[]> {
  return Program.find();
}
