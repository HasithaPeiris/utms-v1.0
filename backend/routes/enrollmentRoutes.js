import express from "express";
const router = express.Router();
import {
  enrollCourse,
  getEnrollments,
  getEnrolledCourseSessions,
  updateEnrollment,
  deleteEnrollment,
} from "../controllers/enrollmentController.js";
import { protect, isAdminOrFaculty } from "../middleware/authMiddleware.js";

router
  .route("/:courseId/enrollments")
  .get(protect, isAdminOrFaculty, getEnrollments);

router.route("/:courseId/sessions").get(protect, getEnrolledCourseSessions);

router.route("/:courseId/enroll").post(protect, enrollCourse);

router
  .route("/:courseId/enrollments/:enrollmentId")
  .put(protect, isAdminOrFaculty, updateEnrollment)
  .delete(protect, isAdminOrFaculty, deleteEnrollment);

export default router;
