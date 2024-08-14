const express = require('express');
const router = express.Router();
const mysqlConnection = require('../config/db');

// Get all patients
exports.getAllPatient = function(callback) {
  console.log("Received a request to fetch all patients.");
  mysqlConnection.query('SELECT * FROM Patients', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving patients' });
    }
  });
};

// Get a single patient by ID
exports.getPatientByID = function(callback) {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM Patients WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving patient' });
    }
  });
};

module.exports = router;