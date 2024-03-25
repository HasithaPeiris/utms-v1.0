import Timetable from "../models/timetableModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get all timetables
// route    GET /api/timetables/
// @access  Public
const getTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find().populate("sessions");
    res.json(timetables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get my timetables (accessible to students)
// route    GET /api/timetables/my-timetables
// @access  Private
const myTimetables = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Fetch the list of courses that the student is enrolled in
  const user = await User.findById(userId).populate("enrollments");
  const enrolledCourses = user.enrollments.map(
    (enrollment) => enrollment.course
  );

  // Fetch the timetable information for each enrolled course
  const timetables = [];
  for (const courseId of enrolledCourses) {
    const timetable = await Timetable.findOne({ course: courseId });
    if (timetable) {
      timetables.push({ course: timetable.name, timetable });
    }
  }

  res.status(200).json({ timetables });
});

// @desc    Get a specific timetable
// route    GET /api/timetables/:id
// @access  Public
const getTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.findOne({ _id: req.params.id }).populate(
      "sessions"
    );

    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }

    res.status(200).json(timetable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a new timetable
// route    POST /api/timetables
// @access  Public
const createTimetable = async (req, res) => {
  const timetable = new Timetable({
    name: req.body.name,
    faculty: req.body.facultyId,
    department: req.body.department,
    academicYear: req.body.academicYear,
    semester: req.body.semester,
    mode: req.body.mode,
  });

  try {
    const newTimetable = await timetable.save();
    res.status(201).json(newTimetable);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Upadate a timetable
// route    PUT /api/timetables/:id
// @access  Private
const updateTimetable = async (req, res) => {
  try {
    const updatedTimetable = await Timetable.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedTimetable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a timetable for a course
// route    DELETE /api/timetables/:id
// @access  Private
const deleteTimetable = async (req, res) => {
  try {
    await Timetable.findByIdAndDelete(req.params.id);
    res.status(200).json("Timetable has been deleted...");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  getTimetables,
  getTimetable,
  createTimetable,
  updateTimetable,
  deleteTimetable,
  myTimetables,
};
