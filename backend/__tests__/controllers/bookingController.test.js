import {
  getBookings,
  getBooking,
} from "../../controllers/bookingController.js";
import Booking from "../../models/bookingModel.js";

jest.mock("../../models/bookingModel.js", () => ({
  find: jest.fn(),
  findOne: jest.fn(),
}));

// Get all bookings
describe("getBookings", () => {
  it("should get all bookings", async () => {
    // Stub bookings data
    const bookingsData = [
      {
        _id: "1",
        room: "Room A",
        day: "Monday",
        startTime: "09:00",
        endTime: "11:00",
      },
      {
        _id: "2",
        room: "Room B",
        day: "Tuesday",
        startTime: "10:00",
        endTime: "12:00",
      },
      // Add more bookings data as needed
    ];

    // Stub Booking.find to resolve with bookings data
    Booking.find.mockResolvedValueOnce(bookingsData);

    // Mock response object
    const res = {
      json: jest.fn(),
    };

    // Call getBookings function
    await getBookings({}, res);

    // Assert that response contains bookings data
    expect(res.json).toHaveBeenCalledWith(bookingsData);
  });

  it("should handle errors", async () => {
    // Stub error message
    const errorMessage = "Internal Server Error";

    // Stub Booking.find to throw an error
    Booking.find.mockRejectedValueOnce(new Error(errorMessage));

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call getBookings function
    await getBookings({}, res);

    // Assert that status 500 is sent with error message
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

// Get a specific booking
describe("getBooking", () => {
  it("should get a specific booking", async () => {
    // Stub request object with booking ID parameter
    const req = { params: { id: "1" } };

    // Stub booking data
    const bookingData = {
      _id: "1",
      room: "Room A",
      day: "Monday",
      startTime: "09:00",
      endTime: "11:00",
    };

    // Stub Booking.findOne to resolve with booking data
    Booking.findOne.mockResolvedValueOnce(bookingData);

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call getBooking function
    await getBooking(req, res);

    // Assert that response contains booking data
    expect(res.json).toHaveBeenCalledWith(bookingData);
  });

  it("should handle booking not found", async () => {
    // Stub request object with booking ID parameter
    const req = { params: { id: "1" } };

    // Stub Booking.findOne to resolve with null (booking not found)
    Booking.findOne.mockResolvedValueOnce(null);

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call getBooking function
    await getBooking(req, res);

    // Assert that status 404 is sent with error message
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Booking not found" });
  });

  it("should handle errors", async () => {
    // Stub request object with booking ID parameter
    const req = { params: { id: "1" } };

    // Stub error message
    const errorMessage = "Internal Server Error";

    // Stub Booking.findOne to throw an error
    Booking.findOne.mockRejectedValueOnce(new Error(errorMessage));

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call getBooking function
    await getBooking(req, res);

    // Assert that status 500 is sent with error message
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
