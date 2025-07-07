const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  time: { type: String },
  location: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String },
  tableOfContent: { type: String },
  objectives: { type: String },
  outcome: { type: String },
  category: {
    type: String,
    enum: ['programming', 'Electrical Engineering', 'Software Engineering', 'consulting', 'ai', 'design', 'business'],
    required: true,
  },
  courseImage: { type: String },
  seats: { type: Number, required: true, min: 0 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  tags: {
    type: String,
    enum: ['HotDeal', 'Popular', 'RareFind', 'BudgetFriendly', 'UpComing'],
  },
   quizzes: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    }
  ],
  enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  generated: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
