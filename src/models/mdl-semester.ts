import { Schema, model, Document, ObjectId } from "mongoose";
import { WeekDay } from "../utils/util-types";

export type ProcessingFileStatus = "pending" | "processing" | "completed" | "failed";
export type SectionStatus = "active" | "completed" | "dropped" | "failed";
export type SemesterSeason = "Summer" | "Fall" | "Winter";

export interface Schedule {
  day: WeekDay;
  time: Date;
  location: string;
}

export interface Section extends SectionProcessing {
  code: string;
  courseID: Schema.Types.ObjectId;
  teacherID: Schema.Types.ObjectId;
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

export interface CreateSemester {
  userID: string;
  season: SemesterSeason;
  startDate: Date;
  endDate: Date;
}

export interface Semester extends Document {
  userID: Schema.Types.ObjectId;
  courses: Section[];
  season: SemesterSeason;
  startDate: Date;
  endDate: Date;
}

const sectionSchema = new Schema<Section>({
  code: { type: String, required: false },
  courseID: { type: Schema.Types.ObjectId, required: false },
  teacherID: { type: Schema.Types.ObjectId, required: false },
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
  userID: { type: Schema.Types.ObjectId, required: true },
  courses: {
    type: [{ type: Schema.Types.ObjectId, ref: "Section" }],
    required: true,
  },
  season: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
});

export const SemesterModel = model("Semester", semesterSchema);
export const SectionModel = model("Section", sectionSchema);

export function create(semester: CreateSemester): Promise<Semester> {
  return SemesterModel.create(semester).then((data: Semester) => data);
}

export function getById(id: string): Promise<Semester | null> {
  return SemesterModel.findById(id);
}

export function getByUserID(userID: string): Promise<Semester[]> {
  return SemesterModel.find({ userID: userID });
}

export function update(semesterId: string, semester: Semester): Promise<Semester | null> {
  return SemesterModel.findByIdAndUpdate(semesterId, semester, { new: true });
}

export async function uploadFile(semesterId: string, fileURL: string): Promise<Section | null> {
  const newSection = await SectionModel.create({
    processingFileStatus: "pending",
    files: [fileURL],
  });
  await SemesterModel.findByIdAndUpdate(
    semesterId,
    { $push: { courses: newSection._id } },
    { new: true }
  );
  return newSection;
}

export function deleteItem(id: string): Promise<Semester | null> {
  return SemesterModel.findByIdAndDelete(id);
}
