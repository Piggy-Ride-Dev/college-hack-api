import "dotenv/config";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import routes from "./routes";
import { connectDB } from "./db";

require("dotenv").config();

export const app: express.Application = express();

app.use(bodyParser.json());
app.use(cookieParser());

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "docs", "index.html"));
});

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
