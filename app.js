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

// Debugging: Check if MySQL is connected
mysqlConnection.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err.stack);
    return;
  }
  console.log('MySQL connected as id ' + mysqlConnection.threadId);
  
  // Place route definitions here after MySQL connection is established

  // Example route to fetch all patients
  app.get('/api/patients', (req, res) => {
    mysqlConnection.query('SELECT * FROM Patients', (err, rows, fields) => {
      if (err) {
        console.error("Error retrieving patients:", err);
        return res.status(500).json({ message: 'Error retrieving patients' });
      }
      res.json(rows);
    });
  });

  // Basic route for testing the server
  app.get('/', (req, res) => {
    res.send('Hospital Management System API is running.');
  });

  // Handle 404 errors
  app.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
  });

  // Start the server after routes are defined
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Debugging: Check if MongoDB is connected
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully.');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});