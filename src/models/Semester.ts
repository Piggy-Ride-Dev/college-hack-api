import { Schema, model, Document } from "mongoose";
import { Section } from "./Institution";

export interface Semester extends Document {
  userID: string;
  courses: Section[];
  number: number;
  year: number;
  start: Date | null;
  end: Date | null;
  grade: number;
}

const semesterSchema = new Schema<Semester>({
  userID: { type: String, required: true },
  courses: {
    type: [{ type: Schema.Types.ObjectId, ref: "Section" }],
    required: true,
  },
  number: { type: Number, required: true },
  start: { type: Date, required: false },
  end: { type: Date, required: false },
  year: { type: Number, required: true },
  grade: { type: Number, required: true },
});

export const Semester = model("Semester", semesterSchema);

export function createSemester(semester: Semester): Promise<Semester> {
  return Semester.create(semester);
}

export function getSemesterById(id: string): Promise<Semester | null> {
  return Semester.findById(id).populate("courses");
}
