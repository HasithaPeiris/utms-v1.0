import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

const isAdminOrFaculty = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "faculty")) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin or faculty" });
  }
};

const isAdminOrFacultyOrStudent = (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "admin" ||
      req.user.role === "faculty" ||
      req.user.role === "student")
  ) {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Not authorized as an admin, faculty, or student" });
  }
};

const isStudent = (req, res, next) => {
  if (req.user && req.user.role === "student") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as a student" });
  }
};

export {
  protect,
  isAdmin,
  isAdminOrFaculty,
  isAdminOrFacultyOrStudent,
  isStudent,
};
