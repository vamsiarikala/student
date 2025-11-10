const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

router.post('/submit', async (req, res) => {
  const { name, email, uniqueId, department, category, description } = req.body;
  try {
    const complaint = new Complaint({ name, email, uniqueId, department, category, description });
    await complaint.save();
    res.status(201).json({ msg: 'Complaint submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;