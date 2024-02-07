import { WeekDay } from "../utils/types";

export type SectionStatus = "active" | "completed" | "dropped" | "failed";

export interface College {
  id?: string;
  name: string;
}

export interface Program {
  id?: string;
  name: string;
  collegeID: string;
  code: string;
  numOfSemesters: number;
}

export interface Teacher {
  id?: string;
  name: string;
  email: string;
}

export interface Course {
  id?: string;
  name: string;
  code: string;
  programID: string;
}

export interface Section {
  id?: string;
  courseID: string;
  teacherID: string;
  code: string;
  lectureDay: WeekDay;
  lectureTime: Date;
  labDay: WeekDay;
  labTime: Date;
  lectureLocation: string;
  labLocation: string;
  status: string;
}
