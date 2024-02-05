import {
  createUser as createUserDB,
  getUserByGoogleId,
  getUserById,
  updateUser,
} from "../models/User";
import { getGoogleUserInfo } from "../services/GoogleAuth";

export async function createUserController(accessToken: string) {
  const googleUserInfo = await getGoogleUserInfo(accessToken);
  let user = await getUserByGoogleId(googleUserInfo.id);
  let isFirstAccess = false;

  if (!user) {
    const userResp = await createUserDB({
      name: googleUserInfo.given_name,
      surname: googleUserInfo.family_name,
      picture: googleUserInfo.picture,
      googleId: googleUserInfo.id,
      email: googleUserInfo.email,
    });
    user = userResp;
    isFirstAccess = true;
  }

  return { user, isFirstAccess };
}

export async function getUserController(id: string) {
  return await getUserById(id);
}

export async function updateUserController(id: string, user: any) {
  return await updateUser(id, user);
}
