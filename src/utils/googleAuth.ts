import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_SECRET;
const REDIRECT_URI = "/auth/google/callback";

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export default oauth2Client;
