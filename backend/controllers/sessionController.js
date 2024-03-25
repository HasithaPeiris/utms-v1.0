import Session from "../models/sessionModel.js";
import Timetable from "../models/timetableModel.js";
import Course from "../models/courseModel.js";

// @desc    Get all sessions
// route    GET /api/sessions
// @access  Public
const getSessions = async (req, res) => {
  try {
    const session = await Session.find();
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get a specific session
// route    GET /api/faculties/:id
// @access  Public
const getSession = async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Add session to timetable
// route    POST /api/sessions/:timetableId
// @access  Private
const addTimetableSession = async (req, res) => {
  try {
    const timetable = await Timetable.findById(req.params.timetableId);
    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }

    const session = new Session({
      name: req.body.name,
      course: req.body.courseId,
      coordinator: req.body.coordinator,
      booking: req.body.bookingId,
      faculty: timetable.faculty,
    });

    const newSession = await session.save();
    timetable.sessions.push(newSession._id);
    await timetable.save();

    res.status(201).json(newSession);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Add session to course
// route    POST /api/sessions/:courseId
// @access  Private
const addCourseSession = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const session = new Session({
      name: req.body.name,
      course: course._id,
      coordinator: req.body.coordinator,
      booking: req.body.bookingId,
      faculty: course.faculty,
    });

    const newSession = await session.save();
    course.sessions.push(newSession._id);
    await course.save();

    res.status(201).json(newSession);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update session in timetable
// route    PUT /api/sessions/:id
// @access  Private
const updateSession = async (req, res, io) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Emitting a socket event to notify about the updated session
    // io.emit("sessionUpdated", `Session ${session._id} updated`);

    res.json(session);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete session
// route    DELETE /api/sessions/:id
// @access  Private
const deleteSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json({ message: "Session deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  getSessions,
  getSession,
  addCourseSession,
  addTimetableSession,
  updateSession,
  deleteSession,
};
