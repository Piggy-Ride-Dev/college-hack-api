import { getSemestersByUserID } from "../models/Semester";

export async function getSemestersController(userid: string) {
  return await getSemestersByUserID(userid);
}
