// In your routes file (e.g., coursesRoutes.js)

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
// Route for getting the homepage courses
router.get('/courses', courseController.homepageForCourses);

// Route for adding a new course
router.post('/courses',authMiddleware, adminMiddleware,courseController.addNewCourse);

// Route for deleting a course by ID
router.delete('/courses/:id', authMiddleware, adminMiddleware,courseController.deleteCourse);

// Route for getting a course by ID
router.get('/courses/:id', courseController.getCourseById);

// Route for updating a course by ID
router.put('/courses/:id',authMiddleware, adminMiddleware ,courseController.updateCourse);

module.exports = router;
