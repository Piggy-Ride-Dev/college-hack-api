import request from "supertest";
import express from "express";
import router from "../../src/routes/userRoutes";
import mongoose from "mongoose";
import * as UserController from "../../src/controllers/User";

jest.mock("../../src/controllers/User", () => ({
  getUserController: jest.fn(),
}));
const mockGetUserController = UserController.getUserController as jest.Mock;

jest.mock("../../src/middlewares/Auth", () => ({
  authenticateToken: jest.fn((req, res, next) => next()),
}));

const app = express();
app.use(express.json());
app.use(router);

beforeAll(() => {
  jest.clearAllMocks();
});

describe("GET /user/:id", () => {
  it("should return 200 and user data for a valid user ID", async () => {
    const mockValidID = new mongoose.Types.ObjectId().toHexString();
    const mockUser = { id: mockValidID, name: "Test User" };
    mockGetUserController.mockResolvedValue(mockUser);

    const response = await request(app).get(`/user/${mockValidID}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ user: mockUser });
  });

  it("should return 404 when no user is found for a valid ID", async () => {
    const mockValidID = new mongoose.Types.ObjectId().toHexString();

    mockGetUserController.mockResolvedValue(null);
    const response = await request(app).get(`/user/${mockValidID}`);
    expect(response.status).toBe(404);
    expect(response.text).toBe("User not found");
  });

  it("should return 400 for an invalid user ID", async () => {
    const response = await request(app).get("/user/1");

    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid user id");
  });

  it("should return 500 if there is an internal error", async () => {
    const mockValidID = new mongoose.Types.ObjectId().toHexString();
    mockGetUserController.mockResolvedValue({
      id: mockValidID,
      name: "Test User",
    });
    mockGetUserController.mockImplementation(() => {
      throw new Error("DB Error");
    });
    const response = await request(app).get(`/user/${mockValidID}`);
    expect(response.status).toBe(500);
  });
});

describe("PATCH /user/:id", () => {
  // TODO:
  // Valid user data
  // Invalid user data

  it("should return 404 when no user is found for a valid ID", async () => {
    const mockValidID = new mongoose.Types.ObjectId().toHexString();

    mockGetUserController.mockResolvedValue(null);
    const response = await request(app).get(`/user/${mockValidID}`);
    expect(response.status).toBe(404);
    expect(response.text).toBe("User not found");
  });

  it("should return 400 for an invalid user ID", async () => {
    const response = await request(app).get("/user/1");

    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid user id");
  });

  it("should return 500 if there is an internal error", async () => {
    const mockValidID = new mongoose.Types.ObjectId().toHexString();
    mockGetUserController.mockResolvedValue({
      id: mockValidID,
      name: "Test User",
    });
    mockGetUserController.mockImplementation(() => {
      throw new Error("DB Error");
    });
    const response = await request(app).get(`/user/${mockValidID}`);
    expect(response.status).toBe(500);
  });
});
