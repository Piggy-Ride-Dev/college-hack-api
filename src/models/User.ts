export interface SectionUser {
  sectionID: string;
  semester: number;
  year: number;
  grade: number;
  isFinished: boolean;
}
export interface User {
  id?: string;
  name: string;
  email: string;
  hashedPassword: string;
  college: string;
  program: string;
  sections: SectionUser[];
  gpa: number;
}
