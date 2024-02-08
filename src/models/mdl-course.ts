import { Schema, model, Document } from "mongoose";

export interface Course extends Document {
  id?: string;
  name: string;
  code: string;
  programID: string;
}

const courseSchema = new Schema<Course>({
  name: { type: String, required: true },
  code: { type: String, required: true },
  programID: { type: String, required: true },
});

export const Course = model("Course", courseSchema);

export function createCourse(course: Course): Promise<Course> {
  return Course.create(course);
}

export function getCourseById(id: string): Promise<Course | null> {
  return Course.findById(id);
}

export function getCoursesByProgramID(programID: string): Promise<Course[]> {
  return Course.find({ programID });
}

export function getCourses(): Promise<Course[]> {
  return Course.find();
}
