import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
