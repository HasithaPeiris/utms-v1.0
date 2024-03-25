import express from "express";
const router = express.Router();
import {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getCourses).post(protect, isAdmin, addCourse);

router.route("/:id").get(protect, getCourse);

router
  .route("/:id")
  .put(protect, isAdmin, updateCourse)
  .delete(protect, isAdmin, deleteCourse);

export default router;
