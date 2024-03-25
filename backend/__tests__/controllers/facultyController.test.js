import { getFaculties, getFaculty } from "../../controllers/facultyController";
import Faculty from "../../models/facultyModel";

jest.mock("../../models/facultyModel", () => ({
  find: jest.fn(),
  findOne: jest.fn(),
}));

// Get all faculties
describe("getFaculties", () => {
  it("should get all faculties", async () => {
    // Stub faculties data
    const facultiesData = [
      {
        _id: "1",
        name: "FOC",
        departments: "SE",
        description: "Description 1",
      },
      {
        _id: "2",
        name: "FOBM",
        departments: "BS",
        description: "Description 2",
      },
      // Add more faculties as needed
    ];

    // Stub Faculty.find to resolve with faculties data
    Faculty.find.mockResolvedValueOnce(facultiesData);

    // Mock response object
    const res = {
      json: jest.fn(),
    };

    // Call getFaculties function
    await getFaculties({}, res);

    // Assert that response contains faculties data
    expect(res.json).toHaveBeenCalledWith(facultiesData);
  });

  it("should handle errors", async () => {
    // Stub error message
    const errorMessage = "Internal Server Error";

    // Stub Faculty.find to throw an error
    Faculty.find.mockRejectedValueOnce(new Error(errorMessage));

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call getFaculties function
    await getFaculties({}, res);

    // Assert that status 500 is sent with error message
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

// Get a specific faculty
describe("getFaculty", () => {
  it("should get a specific faculty", async () => {
    // Stub faculty data
    const facultyData = {
      _id: "1",
      name: "FOC",
      departments: "SE",
      description: "Description 1",
    };

    // Stub Faculty.findOne to resolve with faculty data
    Faculty.findOne.mockResolvedValueOnce(facultyData);

    // Mock request object with faculty ID parameter
    const req = { params: { id: "1" } };

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call getFaculty function
    await getFaculty(req, res);

    // Assert that status 200 is sent with faculty data
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(facultyData);
  });

  it("should handle faculty not found", async () => {
    // Stub Faculty.findOne to resolve with null (faculty not found)
    Faculty.findOne.mockResolvedValueOnce(null);

    // Mock request object with faculty ID parameter
    const req = { params: { id: "1" } };

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call getFaculty function
    await getFaculty(req, res);

    // Assert that status 404 is sent with error message
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Faculty not found" });
  });

  it("should handle errors", async () => {
    // Stub error message
    const errorMessage = "Internal Server Error";

    // Stub Faculty.findOne to throw an error
    Faculty.findOne.mockRejectedValueOnce(new Error(errorMessage));

    // Mock request object with faculty ID parameter
    const req = { params: { id: "1" } };

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call getFaculty function
    await getFaculty(req, res);

    // Assert that status 500 is sent with error message
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
