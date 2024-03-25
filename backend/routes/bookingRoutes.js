import express from "express";
const router = express.Router();
import {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController.js";
import { protect, isAdminOrFaculty } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(protect, getBookings)
  .post(protect, isAdminOrFaculty, createBooking);

router.route("/:id").get(protect, getBooking);

router
  .route("/:id")
  .put(protect, isAdminOrFaculty, updateBooking)
  .delete(protect, isAdminOrFaculty, deleteBooking);

export default router;
