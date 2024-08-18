const express = require('express');
const router = express.Router();
const PatientsAllergies = require('../models/patients_allergies'); // Import the model

// GET all patients' allergies
router.get('/', async (req, res) => {
  try {
    const allergies = await PatientsAllergies.find();
    res.json(allergies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;