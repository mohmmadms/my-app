const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { handleCourseImageUpload } = require('../utils/upload');

router.get('/courses', courseController.homepageForCourses);
router.post('/courses', authMiddleware, adminMiddleware, handleCourseImageUpload, courseController.addNewCourse);
router.delete('/courses/:id', authMiddleware, adminMiddleware, courseController.deleteCourse);
router.get('/courses/:id', courseController.getCourseById);
router.put('/courses/:id', authMiddleware, adminMiddleware, handleCourseImageUpload, courseController.updateCourse);

module.exports = router;
