import request from "supertest";
import express from "express";
import router from "../../src/routes/documentRoutes";

jest.mock("../../src/middlewares/Upload.ts", () => ({
  multipleUpload: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use(router);

beforeAll(() => {
  jest.clearAllMocks();
});

describe("POST /documents/upload", () => {
  it("should return 200 when files are uploaded successfully", async () => {
    const response = await request(app).post("/documents/upload");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Files uploaded successfully" });
  });
});
