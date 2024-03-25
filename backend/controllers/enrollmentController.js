import Course from "../models/courseModel.js";
import User from "../models/userModel.js";
import Enrollment from "../models/enrollmentModel.js";
import asyncHandler from "express-async-handler";

// @desc    Enroll in a course (accessible to students)
// route    POST /api/courses/:courseId/enroll
// @access  Public
const enrollCourse = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.user._id;

  // Check if user is already enrolled in the course
  const existingEnrollment = await Enrollment.findOne({
    user: userId,
    course: courseId,
  });
  if (existingEnrollment) {
    res.status(400);
    throw new Error("Student is already enrolled in this course");
  }

  // Create new enrollment
  const enrollment = await Enrollment.create({
    user: userId,
    course: courseId,
  });

  // Update enrollments arrays of User and Course models
  await User.findByIdAndUpdate(userId, {
    $addToSet: { enrollments: courseId },
  });
  await Course.findByIdAndUpdate(courseId, {
    $addToSet: { enrollments: userId },
  });

  res.status(200).json({ message: "Enrolled successfully", enrollment });
});

// @desc    Get all course sessions after enrolling in the course (accessible to all users)
// route    GET /api/courses/:courseId/sessions
// @access  Public
const getEnrolledCourseSessions = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.user._id;

  // Find the course by ID
  const course = await Course.findById(courseId).populate("sessions");

  if (!course) {
    res.status(404).json({ message: "Course not found" });
    return;
  }

  // Check if the user is enrolled in the course
  const isEnrolled = course.enrollments.includes(userId);

  if (!isEnrolled) {
    res.status(403).json({ message: "Please enroll to view the sessions" });
    return;
  }

  res.status(200).json({ sessions: course.sessions });
});

// @desc    View all enrollments in courses (accessible to faculty and admin)
// route    GET /api/courses/:courseId/enrollments
// @access  Public
const getEnrollments = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;

  const enrollments = await Enrollment.find({ course: courseId }).populate(
    "user"
  );
  res.status(200).json({ enrollments });
});

// @desc    Update enrollment within a course (accessible to faculty and admin)
// route    PUT /api/courses/:courseId/enrollments/:enrollmentId
// @access  Private
const updateEnrollment = asyncHandler(async (req, res) => {
  const { courseId, enrollmentId } = req.params;
  const { userId } = req.body;

  const enrollment = await Enrollment.findByIdAndUpdate(
    enrollmentId,
    { user: userId, course: courseId },
    { new: true }
  );

  res
    .status(200)
    .json({ message: "Enrollment updated successfully", enrollment });
});

// @desc    Delete enrollment within a course (accessible to faculty and admin)
// route    DELETE /api/courses/:courseId/enrollments/:enrollmentId
// @access  Private
const deleteEnrollment = asyncHandler(async (req, res) => {
  const { enrollmentId } = req.params;

  await Enrollment.findByIdAndDelete(enrollmentId);

  res.status(200).json({ message: "Enrollment deleted successfully" });
});

export {
  enrollCourse,
  getEnrollments,
  getEnrolledCourseSessions,
  updateEnrollment,
  deleteEnrollment,
};
