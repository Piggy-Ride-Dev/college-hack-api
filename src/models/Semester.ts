import { Schema, model, Document } from "mongoose";
import { Section } from "./Institution";

export interface Semester extends Document {
  userID: string;
  courses: Section[];
  number: number;
  year: number;
  grade: number;
}

const semesterSchema = new Schema<Semester>({
  userID: { type: String, required: true },
  courses: {
    type: [{ type: Schema.Types.ObjectId, ref: "Section" }],
    required: true,
  },
  number: { type: Number, required: true },
  year: { type: Number, required: true },
  grade: { type: Number, required: true },
});
