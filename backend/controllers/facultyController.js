import Faculty from "../models/facultyModel.js";

// @desc    Get all faculties
// route    GET /api/faculties
// @access  Public
const getFaculties = async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get a specific faculty
// route    GET /api/faculties/:id
// @access  Public
const getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ _id: req.params.id });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.status(200).json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Add a new faculty
// route    POST /api/faculties
// @access  Private
const addFaculty = async (req, res) => {
  const faculty = new Faculty({
    name: req.body.name,
    departments: req.body.departments,
    description: req.body.description,
  });
  try {
    const newFaculty = await faculty.save();
    res.status(201).json(newFaculty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update a faculty
// route    PUT /api/faculties/:id
// @access  Private
const updateFaculty = async (req, res) => {
  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedFaculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a faculty
// route    DELETE /api/faculties/:id
// @access  Private
const deleteFaculty = async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.status(200).json("Faculty has been deleted...");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getFaculties, getFaculty, addFaculty, updateFaculty, deleteFaculty };
