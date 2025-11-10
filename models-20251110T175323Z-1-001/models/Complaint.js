const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  uniqueId: String,
  department: String,
  category: String,
  description: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', complaintSchema);