import { OAuth2Client } from "google-auth-library";

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const IS_PROD = process.env.ENV === "prod";
const BASE_URL = IS_PROD
  ? `${process.env.API_URL}`
  : `${process.env.API_URL}:${process.env.PORT}`;
const REDIRECT_URI = `${BASE_URL}/auth/google/callback`;

console.log("REDIRECT_URI", REDIRECT_URI);

interface ExternalUserInformation {
  id: string;
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export class AuthenticationAdapter {
  private oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new OAuth2Client(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );
  }

  public authenticationUrl = () => {
    if (!IS_PROD && !process.env.PORT)
      console.log("Port ENV missing", REDIRECT_URI);
    return this.oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/tasks",
      ],
    });
  };

  public getAccessInformationToken = async (code: string) => {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      return tokens;
    } catch (error) {
      console.error("Error fetching access token", error);
      throw new Error("Unable to fetch access token");
    }
  };

  public getExternalUserInformation = async (authToken: string) => {
    const accessCredentials = await this.getAccessInformationToken(authToken);
    const googleUserInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";
    try {
      const response: any = await fetch(googleUserInfoUrl, {
        headers: {
          Authorization: `${accessCredentials.token_type} ${accessCredentials.access_token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching user: ${response.status}`);
      }
      return (await response.json()) as ExternalUserInformation;
    } catch (error) {
      console.error("Error fetching user information", error);
      throw new Error("Unable to fetch user information");
    }
  };
}
