const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_here'; // Replace in production

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ username, email, password: hashedPass });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'User not found' });

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { username: user.username, email: user.email, role: user.role } });
});

module.exports = router;
