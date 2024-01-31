const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../../src/middlewares/Auth");

jest.mock("jsonwebtoken");

describe("Middleware: authenticateToken", () => {
  it("should return 401 if no token is provided", () => {
    const req = {
      headers: {},
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("User not authenticated");
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 403 if token is invalid", () => {
    const req = {
      headers: { authorization: `Bearer invalid-token` },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();
    const mockedJwtVerify = jwt.verify as jest.MockedFunction<
      typeof jwt.verify
    >;
    mockedJwtVerify.mockImplementation((token, secret, callback) => {
      callback(new Error("Invalid token"), null);
    });

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith("Invalid token");
    expect(next).not.toHaveBeenCalled();
  });

  it("should authenticate a valid token", () => {
    const user = { id: 1, name: "Test User" };
    const token = "valid.token.here";

    const mockedJwtVerify = jwt.verify as jest.MockedFunction<
      typeof jwt.verify
    >;
    mockedJwtVerify.mockImplementation((token, secret, callback) => {
      callback(null, user);
    });

    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    authenticateToken(req as any, res as any, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });
});
