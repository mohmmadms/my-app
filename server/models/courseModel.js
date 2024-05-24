const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    // Define your schema fields here
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
    tableOfContent: {
        type: String,
    },
    objectives: {
        type: String,
    },
    outcome: {
        type: String,
    },
    category: {
        type: String,
        enum: [ 'programming', 'Electrical Engineering','Software Engineering' ,'consulting'],
        required: true,
    },
    courseImage: {
        type: String,
    },
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

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
