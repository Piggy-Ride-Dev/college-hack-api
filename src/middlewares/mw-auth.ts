import { Request, Response, NextFunction } from "express";
import { User } from "../models/mdl-user";
import jwt from "jsonwebtoken";

export const authorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "User not authenticated" });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, userData) => {
    if (err && err.name === "TokenExpiredError") {
      return res.status(401).send({ message: "Token expired" });
    }
    if (err) {
      return res.status(403).send({ message: "Invalid token" });
    }
    if (!userData) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    userData = userData as { user: User };
    req.user = userData.user;
    next();
  });
};
