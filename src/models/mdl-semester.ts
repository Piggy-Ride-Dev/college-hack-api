import { Schema, model, Document, ObjectId } from "mongoose";
import { WeekDay } from "../utils/util-types";

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

export interface Section extends SectionProcessing {
  code: string;
  courseID: string;
  teacherID: string;
  status: SectionStatus;
  schedules: {
    lecture: Schedule | null;
    lab: Schedule | null;
    office: Schedule | null;
  };
}

export interface SectionProcessing {
  _id?: string;
  processingFileStatus: ProcessingFileStatus;
  files: string[];
}

export interface Semester extends Document {
  userID: string;
  courses: Section[];
  number: number;
  year: number;
  start: Date | null;
  end: Date | null;
}

const sectionSchema = new Schema<Section>({
  code: { type: String, required: false },
  courseID: { type: String, required: false },
  teacherID: { type: String, required: false },
  status: { type: String, required: false },
  schedules: {
    lecture: { type: Object, required: false },
    lab: { type: Object, required: false },
    office: { type: Object, required: false },
  },
  processingFileStatus: { type: String, required: true },
  files: { type: [String], required: true },
});

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

export const SemesterModel = model("Semester", semesterSchema);
export const SectionModel = model("Section", sectionSchema);

export function create(semester: Semester): Promise<Semester> {
  return SemesterModel.create(semester);
}

export function getById(id: string): Promise<Semester | null> {
  return SemesterModel.findById(id);
}

export function getByUserID(userID: string): Promise<Semester[]> {
  return SemesterModel.find({ userID: userID });
}

export function update(
  semesterId: string,
  semester: Semester
): Promise<Semester | null> {
  return SemesterModel.findByIdAndUpdate(semesterId, semester, { new: true });
}

export async function uploadFile(
  semesterId: string,
  fileURL: string
): Promise<Semester | null> {
  const newSection = await SectionModel.create({
    processingFileStatus: "pending",
    files: [fileURL],
  });
  return await SemesterModel.findByIdAndUpdate(
    semesterId,
    { $push: { courses: newSection._id } },
    { new: true }
  );
}

export function deleteItem(id: string): Promise<Semester | null> {
  return SemesterModel.findByIdAndDelete(id);
}
