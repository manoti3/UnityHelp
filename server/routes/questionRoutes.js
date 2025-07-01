const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions
router.get('/', async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

// Create a question
router.post('/', async (req, res) => {
  const { title, description, tags, createdBy } = req.body;
  const newQ = await Question.create({ title, description, tags, createdBy });
  res.json(newQ);
});

// Answer a question
router.post('/:id/answers', async (req, res) => {
  const question = await Question.findById(req.params.id);
  question.answers.push({ text: req.body.text });
  await question.save();
  res.json(question);
});

module.exports = router;
