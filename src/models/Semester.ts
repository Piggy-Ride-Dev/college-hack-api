import { Schema, model, Document } from "mongoose";
import { WeekDay } from "../utils/types";

export type ProcessingFileStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed";
export type SectionStatus = "active" | "completed" | "dropped" | "failed";

export interface Schedule {
  day: WeekDay;
  time: Date;
  location: string;
}

export interface Section {
  id?: string;
  code: string;
  courseID: string;
  teacherID: string;
  processingFileStatus: ProcessingFileStatus;
  status: SectionStatus;
  schedules: {
    lecture: Schedule | null;
    lab: Schedule | null;
    office: Schedule | null;
  };
}

export interface Semester extends Document {
  userID: string;
  courses: Section[];
  number: number;
  year: number;
  start: Date | null;
  end: Date | null;
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
});

export const Semester = model("Semester", semesterSchema);

export function createSemester(semester: Semester): Promise<Semester> {
  return Semester.create(semester);
}

export function getSemesterById(id: string): Promise<Semester | null> {
  return Semester.findById(id).populate("sections");
}

export function getSemestersByUserID(userID: string): Promise<Semester[]> {
  return Semester.find({ userID: userID }).populate("sections");
}

export function deleteSemester(id: string): Promise<Semester | null> {
  return Semester.findByIdAndDelete(id);
}
