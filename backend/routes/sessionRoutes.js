import express from "express";
const router = express.Router();
import {
  getSessions,
  getSession,
  addCourseSession,
  updateSession,
  deleteSession,
} from "../controllers/sessionController.js";
import { protect, isAdminOrFaculty } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getSessions);

router.route("/:courseId").post(protect, isAdminOrFaculty, addCourseSession);

router.route("/:id").get(protect, getSession);

router
  .route("/:id")
  .put(protect, isAdminOrFaculty, updateSession)
  .delete(protect, isAdminOrFaculty, deleteSession);

export default router;
