const express = require('express');
const router = express.Router();
const courseController = require('../controllers/enrollController');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// Route for enrolling in a course
router.post('/courses/:courseId/enroll',authMiddleware ,courseController.enrollInCourse);

// Route for unenrolling from a course
router.post('/courses/:courseId/unenroll',authMiddleware ,courseController.unenrollFromCourse);

// Route for fetching a user's enrolled courses
router.get('/users/:userId/enrolled-courses',authMiddleware ,courseController.getUserEnrolledCourses);

router.get('/courses/:courseId/enrolled-users',authMiddleware, adminMiddleware,courseController.getEnrolledUsersForCourse); 

module.exports = router;