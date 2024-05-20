
const Course = require('../models/courseModel');
const User = require('../models/userModel');

exports.enrollInCourse = async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user._id;

    try {
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (course.enrolledUsers.includes(userId)) {
            return res.status(400).json({ message: 'User is already enrolled in this course' });
        }

        if (course.seats <= 0) {
            return res.status(400).json({ message: 'No available seats left for this course' });
        }

        // Enroll the user in the course
        course.enrolledUsers.push(userId);
        course.seats -= 1;
        await course.save();

        // Populate enrolledUsers with name and email
        await course.populate('enrolledUsers').execPopulate();

        res.status(200).json({ message: 'Enrollment successful', course });
    } catch (error) {
        console.error('Error enrolling in course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getEnrolledUsersForCourse = async (req, res) => {
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId).populate('enrolledUsers', 'name email');

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ 
            courseTitle: course.title,
            numberOfEnrolledUsers: course.enrolledUsers.length,
            enrolledUsers: course.enrolledUsers,
        });
    } catch (error) {
        console.error('Error fetching enrolled users for course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.unenrollFromCourse = async (req, res) => {
    const { courseId } = req.params;
    const { userId } = req.body;

    try {
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const index = course.enrolledUsers.indexOf(userId);
        if (index === -1) {
            return res.status(400).json({ message: 'User is not enrolled in this course' });
        }

        // Remove user from enrolled users list and increase seats count
        course.enrolledUsers.splice(index, 1);
        course.seats += 1;
        await course.save();

        res.status(200).json({ message: 'Unenrollment successful', course });
    } catch (error) {
        console.error('Error unenrolling from course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getUserEnrolledCourses = async (req, res) => {
    const { userId } = req.params;

    try {
        const enrolledCourses = await Course.find({ enrolledUsers: userId });
        res.status(200).json(enrolledCourses);
    } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

