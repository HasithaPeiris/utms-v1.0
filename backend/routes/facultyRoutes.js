import express from "express";
const router = express.Router();
import {
  getFaculties,
  getFaculty,
  addFaculty,
  updateFaculty,
  deleteFaculty,
} from "../controllers/facultyController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getFaculties).post(protect, isAdmin, addFaculty);

router.route("/:id").get(protect, getFaculty);

router
  .route("/:id")
  .put(protect, isAdmin, updateFaculty)
  .delete(protect, isAdmin, deleteFaculty);

export default router;
