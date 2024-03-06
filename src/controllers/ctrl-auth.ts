import jwt from "jsonwebtoken";
import { findOrCreateUser, UserResponseData } from "./ctrl-user";
import { AuthenticationAdapter } from "../adapters/adap-auth";
import { ControllerResponse } from "../utils/util-response";

export const getAuthUrl = (authAdapter: AuthenticationAdapter) => {
  return authAdapter.authenticationUrl();
};

export const authorizeUser = async (authToken: string, authAdapter: AuthenticationAdapter) => {
  try {
    const userInformation = await authAdapter.getExternalUserInformation(authToken);
    const { user, isFirstAccess } = (
      await findOrCreateUser(
        userInformation.email,
        userInformation.given_name,
        userInformation.family_name,
        userInformation.id,
        userInformation.picture
      )
    ).data as UserResponseData;
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT secret is not defined.");
    const jwtToken = jwt.sign({ user }, jwtSecret, {
      expiresIn: "48h",
    });
    const frontendUrl = process.env.FRONTEND_URL;
    if (!frontendUrl) throw new Error("Frontend URL is not defined.");
    const cookie = {
      token: jwtToken,
      userId: user.id,
      isFirstAccess: isFirstAccess,
    };
    return ControllerResponse.success({ url: frontendUrl, cookie });
  } catch (error) {
    console.error("Authorization error:", error);
    return ControllerResponse.error(500, `Internal server error: ${error}`);
  }
};
