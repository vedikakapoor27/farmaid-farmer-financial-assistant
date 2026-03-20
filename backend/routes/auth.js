const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, state, landArea, cropType } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name, email,
      password: hashedPassword,
      phone, state, landArea, cropType
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'farmaid_secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: '✅ Registration successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        state: user.state
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'farmaid_secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: '✅ Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        state: user.state
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;