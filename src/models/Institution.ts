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
