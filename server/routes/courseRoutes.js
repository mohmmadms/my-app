const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { handleCourseImageUpload } = require('../utils/upload');
const generateCourseContent = require('../utils/aiCoursesGenerator');
const  Course  = require("../models/courseModel");
const getImageForTopic = require("../utils/getImageForTopic");

router.get('/courses', courseController.homepageForCourses);
router.post('/courses', authMiddleware, adminMiddleware, handleCourseImageUpload, courseController.addNewCourse);
router.delete('/courses/:id', authMiddleware, adminMiddleware, courseController.deleteCourse);
router.get('/courses/:id', courseController.getCourseById);
router.put('/courses/:id', authMiddleware, adminMiddleware, handleCourseImageUpload, courseController.updateCourse);

router.post('/generate', async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required.' });
  }

  try {
    console.log('📥 Topic received in route:', topic);

    const aiCourse = await generateCourseContent(topic);
    const imagePath = getImageForTopic(topic); // 🧠 Use topic to determine image

    const newCourse = new Course({
      title: aiCourse.title,
      description: aiCourse.description,
      objectives: aiCourse.objectives.join('\n'),
      tableOfContent: aiCourse.tableOfContent.join('\n'),
      quizzes: aiCourse.quizzes,
      location: "Online",
      price: 0,
      category: "programming", // Optional: adjust based on topic
      seats: 100,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week course
      generated: true,
      courseImage: imagePath, // ✅ Set local image path here
    });

    const saved = await newCourse.save();
    res.status(201).json(saved);

  } catch (error) {
    console.error("❌ Error generating course:", error);
    res.status(500).json({ error: 'Failed to generate course' });
  }
});



module.exports = router;
