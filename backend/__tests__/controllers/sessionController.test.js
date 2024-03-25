import {
  getSessions,
  getSession,
  addSession,
  updateSession,
  deleteSession,
} from "../../controllers/sessionController.js";

import Session from "../../models/sessionModel.js";

jest.mock("../../models/sessionModel.js");

describe("Session Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getSessions", () => {
    it("should fetch all sessions", async () => {
      // Stub sessions data
      const sessionsData = [
        { _id: "1", name: "Session 1" },
        { _id: "2", name: "Session 2" },
      ];

      // Mock Session.find to resolve with sessions data
      Session.find.mockResolvedValueOnce(sessionsData);

      // Mock response object
      const res = { json: jest.fn() };

      // Call getSessions function
      await getSessions(null, res);

      // Assert that response contains sessions data
      expect(res.json).toHaveBeenCalledWith(sessionsData);
    });

    it("should handle errors", async () => {
      // Stub error message
      const errorMessage = "Internal Server Error";

      // Mock Session.find to throw an error
      Session.find.mockRejectedValueOnce(new Error(errorMessage));

      // Mock response object
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Call getSessions function
      await getSessions(null, res);

      // Assert that status 500 is sent with error message
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe("getSession", () => {
    it("should fetch a specific session", async () => {
      // Stub session data
      const sessionData = { _id: "1", name: "Session 1" };

      // Mock Session.findOne to resolve with session data
      Session.findOne.mockResolvedValueOnce(sessionData);

      // Mock request object
      const req = { params: { id: "1" } };

      // Mock response object
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      // Call getSession function
      await getSession(req, res);

      // Assert that response contains session data
      expect(res.json).toHaveBeenCalledWith(sessionData);
    });

    it("should handle session not found", async () => {
      // Mock Session.findOne to resolve with null
      Session.findOne.mockResolvedValueOnce(null);

      // Mock request object
      const req = { params: { id: "1" } };

      // Mock response object
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Call getSession function
      await getSession(req, res);

      // Assert that status 404 is sent with error message
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Session not found" });
    });

    it("should handle errors", async () => {
      // Stub error message
      const errorMessage = "Internal Server Error";

      // Mock Session.findOne to throw an error
      Session.findOne.mockRejectedValueOnce(new Error(errorMessage));

      // Mock request object
      const req = { params: { id: "1" } };

      // Mock response object
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Call getSession function
      await getSession(req, res);

      // Assert that status 500 is sent with error message
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});
