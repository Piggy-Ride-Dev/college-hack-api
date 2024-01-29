import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_SECRET;
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

export const getGoogleUser = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  const googleUserInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";

  try {
    const response: any = await fetch(googleUserInfoUrl, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user from Google", error);
    throw new Error("Unable to fetch user information");
  }
};

export default oauth2Client;
