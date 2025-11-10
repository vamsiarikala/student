const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register
router.post('/register', async (req, res) => {
  const { name, email, uniqueId, department, password } = req.body;

  try {
    const exists = await User.findOne({ $or: [{ email }, { uniqueId }] });
    if (exists) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, uniqueId, department, password: hashedPassword });
    await user.save();
    res.status(201).json({ msg: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { uniqueId, password } = req.body;

  try {
    const user = await User.findOne({ uniqueId });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid password' });

    res.status(200).json({
      msg: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
        department: user.department,
        uniqueId: user.uniqueId
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;