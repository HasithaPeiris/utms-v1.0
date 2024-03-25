import Course from "../models/courseModel.js";

// @desc    Get all courses
// route    GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const course = await Course.find();
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get a specific course
// route    GET /api/courses/:id
// @access  Public
const getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a new course
// route    POST /api/courses
// @access  Private
const addCourse = async (req, res) => {
  const course = new Course({
    name: req.body.name,
    code: req.body.code,
    description: req.body.description,
    credits: req.body.credits,
    faculty: req.body.facultyId,
  });
  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update a course
// route    PUT /api/courses/:id
// @access  Private
const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a course
// route    DELETE /api/courses/:id
// @access  Private
const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json("Course has been deleted...");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getCourses, getCourse, addCourse, updateCourse, deleteCourse };
