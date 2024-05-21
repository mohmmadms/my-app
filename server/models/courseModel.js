const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        enum: [ 'programming', 'Electrical Engineering','Software Engineering' ,'consulting'],
        required: true,
    },
    eventImage: String,
    seats: {
        type: Number,
        required: true,
        min: 0,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    tags: {
        type: String,
        enum: ['HotDeal', 'Popular', 'RareFind', 'BudgetFriendly', 'UpComing'],
    },
    enrolledUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
}, { timestamps: true });

// Add indexes
courseSchema.index({ title: 1 });
courseSchema.index({ category: 1 });
courseSchema.index({ createdAt: -1 });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

