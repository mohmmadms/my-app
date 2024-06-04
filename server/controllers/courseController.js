const  Course  = require("../models/courseModel");
const {uploadToFirebaseStorage} = require('../utils/upload')


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
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "The 'courseImage' field is required" });
    }

    // Extract data from request body
    const { title, time, location, price, category, startDate, endDate, seats, description , tableOfContent,objectives ,outcome } = req.body;
    let courseImageUrl;
    try {
      const publicUrl = await uploadToFirebaseStorage(req.file, 'courseImages');
      courseImageUrl = publicUrl; // Set course image URL from Firebase
    } catch (error) {
      return res.status(500).json({ error: 'Failed to upload course image to Firebase Storage' });
    }
    // Construct course data object
    const courseData = {
      title,
      time,
      location,
      price,
      tableOfContent,
      objectives,
      outcome,
      category,
      startDate,
      endDate,
      seats,
      description,
      courseImage: courseImageUrl, // Relative path
    };

    // Create new course
    const result = await Course.create(courseData);

    // Respond with the created course
    res.status(201).json(result);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
}


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

      const updatedData = {
          title: req.body.title,
          time: req.body.time,
          location: req.body.location,
          tableOfContent :req.body.tableOfContent,
          objectives: req.body.objectives,
          outcome: req.body.outcome,
          price: req.body.price,
          category: req.body.category,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          seats: req.body.seats,
          description: req.body.description,
      };

      if (req.file) {
        try {
          const publicUrl = await uploadToFirebaseStorage(req.file, 'courseImages');
          updatedData.courseImage = publicUrl; // Set course image URL from Firebase
        } catch (error) {
          return res.status(500).json({ error: 'Failed to upload course image to Firebase Storage' });
        }
      }

      const updatedCourse = await Course.findByIdAndUpdate(id, updatedData, { new: true });

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
