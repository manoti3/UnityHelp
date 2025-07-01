const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  title: String,
  description: String,
  answers: [{ text: String, upvotes: { type: Number, default: 0 } }],
  tags: [String],
  createdBy: String, // Store username or userId
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);
