export enum WeekDay {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
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
  code: string;
  teacherID: string;
  lectureDay: WeekDay;
  lectureTime: Date;
  labDay: WeekDay;
  labTime: Date;
  lectureLocation: string;
  labLocation: string;
}
