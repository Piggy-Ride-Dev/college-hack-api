import { Request } from "express";
import { User } from "../../src/models/user";

declare global {
  namespace Express {
    interface Request {
      isAuthenticated(): boolean;
      user?: User;
    }
  }
}
