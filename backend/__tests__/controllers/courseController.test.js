import {
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} from "../../controllers/courseController.js";
import Course from "../../models/courseModel.js";

const courses = [
  {
    _id: "1",
    name: "AF",
    code: "CSE101",
    description: "Description 1",
    credits: 3,
  },
  {
    _id: "2",
    name: "DS",
    code: "CSE102",
    description: "Description 2",
    credits: 4,
  },
];

// Mock Course.find function
jest.mock("../../models/courseModel.js", () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

// Get all courses, Get a specific course
describe("getCourses", () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    Course.find.mockReset();
  });

  it("should return all courses", async () => {
    // Stub Course.find to resolve with courses data
    Course.find.mockResolvedValueOnce(courses);

    // Mock response object
    const res = {
      json: jest.fn(),
    };

    // Call getCourses function
    await getCourses(null, res);

    // Assert that response contains courses data
    expect(res.json).toHaveBeenCalledWith(courses);
  });

  it("should handle errors", async () => {
    // Stub error message
    const errorMessage = "Internal Server Error";

    // Stub Course.find to throw an error
    Course.find.mockRejectedValueOnce(new Error(errorMessage));

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call getCourses function
    await getCourses(null, res);

    // Assert that response contains error message and status 500
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

// Get a specific course
describe("getCourse", () => {
  it("should return the course if found", async () => {
    // Stub course data
    const course = {
      _id: "1",
      name: "AF",
      code: "CSE101",
      description: "Description 1",
      credits: 3,
    };

    // Stub Course.findOne to resolve with course data
    Course.findOne.mockResolvedValueOnce(course);

    // Mock request and response objects
    const req = { params: { id: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call getCourse function
    await getCourse(req, res);

    // Assert that status 200 is sent with course data
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(course);
  });

  it("should return 404 if course not found", async () => {
    // Stub Course.findOne to resolve with null (course not found)
    Course.findOne.mockResolvedValueOnce(null);

    // Mock request and response objects
    const req = { params: { id: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call getCourse function
    await getCourse(req, res);

    // Assert that status 404 is sent with error message
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Course not found" });
  });

  it("should handle errors", async () => {
    // Stub error message
    const errorMessage = "Internal Server Error";

    // Stub Course.findOne to throw an error
    Course.findOne.mockRejectedValueOnce(new Error(errorMessage));

    // Mock request and response objects
    const req = { params: { id: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call getCourse function
    await getCourse(req, res);

    // Assert that status 500 is sent with error message
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

// Update course
describe("updateCourse", () => {
  it("should update an existing course", async () => {
    // Stub request body
    const req = {
      params: { id: "123" },
      body: {
        name: "Updated Course",
        code: "UC101",
        description: "Updated Description",
        credits: 4,
      },
    };

    // Stub updated course data
    const updatedCourseData = {
      _id: "123",
      name: "Updated Course",
      code: "UC101",
      description: "Updated Description",
      credits: 4,
    };

    // Stub Course.findByIdAndUpdate to resolve with the updated course data
    Course.findByIdAndUpdate.mockResolvedValueOnce(updatedCourseData);

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call updateCourse function
    await updateCourse(req, res);

    // Assert that status 200 is sent with updated course data
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedCourseData);
  });

  it("should handle errors", async () => {
    // Stub request body
    const req = {
      params: { id: "123" },
      body: {
        name: "Updated Course",
        code: "UC101",
        description: "Updated Description",
        credits: 4,
      },
    };

    // Stub error message
    const errorMessage = "Internal Server Error";

    // Stub Course.findByIdAndUpdate to throw an error
    Course.findByIdAndUpdate.mockRejectedValueOnce(new Error(errorMessage));

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call updateCourse function
    await updateCourse(req, res);

    // Assert that status 500 is sent with error message
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

// Delete course
describe("deleteCourse", () => {
  it("should delete an existing course", async () => {
    // Stub request object with course ID parameter
    const req = { params: { id: "123" } };

    // Stub Course.findByIdAndDelete to resolve successfully
    Course.findByIdAndDelete.mockResolvedValueOnce();

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call deleteCourse function
    await deleteCourse(req, res);

    // Assert that status 200 is sent with success message
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("Course has been deleted...");
  });

  it("should handle errors", async () => {
    // Stub request object with course ID parameter
    const req = { params: { id: "123" } };

    // Stub error message
    const errorMessage = "Internal Server Error";

    // Stub Course.findByIdAndDelete to throw an error
    Course.findByIdAndDelete.mockRejectedValueOnce(new Error(errorMessage));

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call deleteCourse function
    await deleteCourse(req, res);

    // Assert that status 500 is sent with error message
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
