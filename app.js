// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// Create an Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(morgan('dev')); // Log HTTP requests to the console
app.use(bodyParser.json()); // Parse JSON request bodies

// Import your database connections from the config folder
const mysqlConnection = require('./config/db'); // MySQL connection
const mongoose = require('mongoose');
const mongoConfig = require('./config/mongodb'); // MongoDB connection

// Connect to MongoDB using your config
mongoose.connect(mongoConfig.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB!');
}).catch(err => {
  console.error('Could not connect to MongoDB', err);
});

// Basic route for testing the server
app.get('/', (req, res) => {
  res.send('Hospital Management System API is running.');
});

// Define other routes (e.g., for patients, staff, appointments)
// Example:
// const patientRoutes = require('./routes/patients');
// app.use('/api/patients', patientRoutes);

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});