import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema(
  {
    // standard naming = Y3S1_WD_
    name: {
      type: String,
      required: true,
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
    department: {
      type: String,
    },
    academicYear: {
      type: Number,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    mode: {
      type: String,
    },
    sessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session",
      },
    ],
  },
  { timestamps: true }
);

const Timetable = mongoose.model("Timetable", timetableSchema);

export default Timetable;
