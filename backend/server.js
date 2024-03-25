import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import configSocket from "./config/socket.js";
const port = process.env.PORT || 5000;

// Routes
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import timetableRoutes from "./routes/timetableRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";

connectDB();

const app = express();

const server = createServer(app);
const io = configSocket(server);
app.set("io", io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/courses", enrollmentRoutes);
app.use("/api/faculties", facultyRoutes);
app.use("/api/timetables", timetableRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
