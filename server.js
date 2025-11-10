const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaint');

const app = express();
const PORT = 5000; // Use 5000 for API

mongoose.connect('mongodb://127.0.0.1:27017/studentComplaints', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serves index.html and images
app.use(express.static('Public'));
// API routes
app.use('/api/auth', authRoutes);
app.use('/api/complaint', complaintRoutes);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));