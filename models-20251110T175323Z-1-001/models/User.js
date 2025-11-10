const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  uniqueId: { type: String, unique: true },
  department: String,
  password: String
});
module.exports = mongoose.model('User', userSchema);