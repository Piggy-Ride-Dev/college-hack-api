import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

interface GoogleUserInfo {
  id: string;
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

dotenv.config();

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/auth/google/callback";

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export const getGoogleAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  });
};

export const getGoogleAccessToken = async (code: string) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
  } catch (error) {
    console.error("Error fetching access token", error);
    throw new Error("Unable to fetch access token");
  }
};

export const getUserInfo = async (accessToken: string) => {
  const googleUserInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";
  try {
    const response: any = await fetch(googleUserInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching user: ${response.status}`);
    }

    const userData = await response.json();
    return userData as GoogleUserInfo;
  } catch (error) {
    console.error("Error fetching user from Google", error);
    throw new Error("Unable to fetch user information");
  }
};

export default oauth2Client;
