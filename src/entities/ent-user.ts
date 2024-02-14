export interface UserCreate {
  name: string;
  surname: string;
  email: string;
  googleId: string;
  picture: string;
}

export interface UserUpdate {
  name?: string;
  surname?: string;
  college?: string;
  program?: string;
  picture?: string;
  gpa?: number;
}

export class User extends Document {
  id?: string;
  name: string;
  surname: string;
  picture: string;
  googleId: string;
  email: string;
  college: string;
  program: string;
  gpa: number;

  constructor(
    name: string,
    surname: string,
    picture: string,
    googleId: string,
    email: string,
    college: string,
    program: string,
    gpa: number
  ) {
    super();
    this.name = name;
    this.surname = surname;
    this.picture = picture;
    this.googleId = googleId;
    this.email = email;
    this.college = college;
    this.program = program;
    this.gpa = gpa;
  }

  create(user: UserCreate): Promise<User> {
    return UserCollection.create(user);
  }

  update(id: string, user: UserUpdate): Promise<User | null> {
    return UserCollection.findByIdAndUpdate(id, user);
  }
}
