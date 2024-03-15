import { Schema, model, Document } from "mongoose";

export interface Teacher extends Document {
  id?: string;
  name: string;
  email: string;
}

const teacherSchema = new Schema<Teacher>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  { versionKey: false }
);

export const Teacher = model("Teacher", teacherSchema);

export function createTeacher(teacher: Teacher): Promise<Teacher> {
  return Teacher.create(teacher);
}

export function getTeacherById(id: string): Promise<Teacher | null> {
  return Teacher.findById(id);
}

export function getTeachers(): Promise<Teacher[]> {
  return Teacher.find();
}
