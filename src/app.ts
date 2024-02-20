import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import routes from "./routes";
import { connectDB } from "./db/connection";

require("dotenv").config();

export const app: express.Application = express();

app.use(bodyParser.json());
app.use(cookieParser());

connectDB();

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
