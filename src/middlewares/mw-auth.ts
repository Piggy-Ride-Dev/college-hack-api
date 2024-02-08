import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("User not authenticated");
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err && err.name === "TokenExpiredError") {
      return res.status(401).send("Token expired");
    }
    if (err) {
      return res.status(403).send("Invalid token");
    }
    req.user = user;
    next();
  });
};
