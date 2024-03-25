import express from "express";
const router = express.Router();
import {
  getTimetables,
  getTimetable,
  createTimetable,
  updateTimetable,
  deleteTimetable,
  myTimetables,
} from "../controllers/timetableController.js";
import { protect, isAdminOrFaculty } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(protect, getTimetables)
  .post(protect, isAdminOrFaculty, createTimetable);

router.route("/:id").get(protect, getTimetable);

router.route("/my-timetables").get(protect, myTimetables);

router
  .route("/:id")
  .put(protect, isAdminOrFaculty, updateTimetable)
  .delete(protect, isAdminOrFaculty, deleteTimetable);

export default router;
