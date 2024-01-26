export interface College {
  id?: string;
  name: string;
}

export interface Program {
  id?: string; // MongoDB ID represented as string in TypeScript
  name: string;
  collegeID: string; // Representing primitive.ObjectID as string
  code: string;
  numOfSemesters: number;
}

export interface Teacher {
  id?: string; // MongoDB ID represented as string in TypeScript
  name: string;
  email: string;
}
