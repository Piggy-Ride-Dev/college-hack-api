import { getSemestersByUserID } from "../models/mdl-semester";

export async function getSemestersController(userid: string) {
  return await getSemestersByUserID(userid);
}
