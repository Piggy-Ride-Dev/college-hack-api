import {
  createUser as createUserDB,
  getUserByGoogleId,
  getUserById,
} from "../models/User";
import { getGoogleUserInfo } from "../services/GoogleAuth";

export async function createUserController(accessToken: string) {
  const googleUserInfo = await getGoogleUserInfo(accessToken);
  let user = await getUserByGoogleId(googleUserInfo.id);

  if (!user) {
    const userResp = await createUserDB({
      name: googleUserInfo.given_name,
      surname: googleUserInfo.family_name,
      picture: googleUserInfo.picture,
      googleId: googleUserInfo.id,
      email: googleUserInfo.email,
    });
    user = userResp;
  }

  return user;
}

export async function getUserController(id: string) {
  return await getUserById(id);
}
