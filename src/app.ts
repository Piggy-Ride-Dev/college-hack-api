import "dotenv/config";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import path from "path";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import { connectDB } from "./db";

require("dotenv").config();

export const app: express.Application = express();

app.use(bodyParser.json());

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "docs", "index.html"));
});

app.use(authRouter);

app.get("/check-db", (req: Request, res: Response) => {
  const state = mongoose.connection.readyState;

  if (state === 1) {
    res.send("Database connection is OK");
  } else {
    console.error("Database connection failed");
    res.status(500).send("Database connection failed");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
