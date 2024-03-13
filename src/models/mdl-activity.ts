export enum ActivityType {
  Lab = "lab",
  Workshop = "workshop",
  Exercise = "exercise",
  Quiz = "quiz",
  Test = "test",
  MidTerm = "midterm",
  Final = "final",
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
  type: ActivityType;
}
