import "dotenv/config";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import routes from "./routes";
import cors from "cors";
import { connectDB } from "./db/connection";
// import "./tasks/scheduler";

require("dotenv").config();

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3333";

export const app: express.Application = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
  },
  apis: ["./src/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

app.use(cors({ origin: frontendUrl, credentials: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

connectDB();

app.use(routes);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
