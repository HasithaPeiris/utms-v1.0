import Booking from "../models/bookingModel.js";

// @desc    Create a booking
// route    POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const isRoomBooked = await Booking.exists({
      room: req.body.room,
      day: req.body.day,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    });

    if (isRoomBooked) {
      return res.status(400).json({ message: "This room is already booked" });
    }

    const booking = new Booking({
      room: req.body.room,
      day: req.body.day,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    });

    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Get all booking
// route    GET /api/bookings
// @access  Private
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get a specific booking
// route    GET /api/bookings/:id
// @access  Public
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update booking
// route    PUT /api/bookings/:id
// @access  Private
const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if updating properties results in conflict with existing booking
    const isRoomBooked = await Booking.exists({
      room: req.body.room || booking.room,
      day: req.body.day || booking.day,
      startTime: req.body.startTime || booking.startTime,
      endTime: req.body.endTime || booking.endTime,
      _id: { $ne: booking._id },
    });

    if (isRoomBooked) {
      return res.status(400).json({ message: "This room is already booked" });
    }

    if (req.body.room != null) {
      booking.room = req.body.room;
    }
    if (req.body.day != null) {
      booking.day = req.body.day;
    }
    if (req.body.startTime != null) {
      booking.startTime = req.body.startTime;
    }
    if (req.body.endTime != null) {
      booking.endTime = req.body.endTime;
    }

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete booking
// route    DELETE /api/bookings/:id
// @access  Private
const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json("Booking has been deleted...");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createBooking, getBookings, getBooking, updateBooking, deleteBooking };
