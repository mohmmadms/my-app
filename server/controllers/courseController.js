const  Course  = require("../models/courseModel");

const homepageForCourses = async (req, res, next) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const skip = (page - 1) * limit;
    
    
    const searchQuery = {};
    
    if (req.query.title) {
      searchQuery.title = { $regex: req.query.title, $options: 'i' }; 
    }
    
    if (req.query.category) {
      searchQuery.category = { $regex: req.query.category, $options: 'i' }; 
    }

    
    const courses = await Course.find(searchQuery)
      .select('-enrolledUsers') 
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(); 

    res.status(200).json(courses);
  } catch (error) {
    next(error); 
  }
};

const addNewCourse = async (req, res) => {
  try {
    const requiredFields = [
      'title',
      'time',
      'location',
      'price',
      'category',
      'startDate',
      'endDate',
      'seats',
      'description',
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `The '${field}' field is required` });
      }
    }

    const result = await Course.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(deletedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  homepageForCourses,
  addNewCourse,
  deleteCourse,
  getCourseById,
  updateCourse,
};
