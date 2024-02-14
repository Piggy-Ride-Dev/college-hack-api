import { model, Schema } from "mongoose";
import { User, UserCreate, UserUpdate } from "../entities/ent-user";

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  picture: { type: String, required: false },
  googleId: { type: String, required: true },
  email: { type: String, required: true },
  college: { type: String, required: false },
  program: { type: String, required: false },
  gpa: { type: Number, required: false },
});

export const UserCollection = model("User", userSchema);

export function create(user: UserCreate): Promise<User> {
  return UserCollection.create(user);
}

export function update(id: string, user: UserUpdate): Promise<User | null> {
  return UserCollection.findByIdAndUpdate(id, user);
}
export function get(id: string): Promise<User | null> {
  return UserCollection.findById(id);
}

export function getByGoogleId(id: string): Promise<User | null> {
  return UserCollection.findOne({ googleId: id });
}
