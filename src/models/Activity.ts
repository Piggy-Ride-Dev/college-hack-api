export enum ExamType {
  Quiz = "quiz",
  Test = "test",
  MidTerm = "midterm",
  Final = "final",
  Other = "other",
}

export enum AssignmentType {
  Lab = "lab",
  Workshop = "workshop",
  Exercise = "exercise",
  Other = "other",
}

export interface Activity {
  id?: string;
  userID: string;
  sectionID: string;
  courseID: string;
  number: number;
  grade: number;
  weekNumber: number;
  dueDate: Date;
  rate: number;
}

export interface Exam extends Activity {
  examType: ExamType;
}

export interface Assignment extends Activity {
  assignmentType: AssignmentType;
  name: string;
  isInGroup: boolean;
}
