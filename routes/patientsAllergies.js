const express = require('express');
const router = express.Router();
const patients_allergies = require('../models/patients_allergies'); // Import the model

// GET all patients' allergies
router.get('/', async (req, res) => {
  try {
    const allergies = await patients_allergies.find();
    res.json(allergies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /patients-allergies
router.post('/', async (req, res) => {
  try {
    const newAllergy = new patients_allergies(req.body);
    const savedAllergy = await newAllergy.save();
    res.status(201).json(savedAllergy);
  } catch (error) {
    res.status(400).json({ message: 'Error adding patient allergy', error });
  }
});

// GET /patients-allergies/:id - Get a specific patient allergy by ID
router.get('/:id', async (req, res) => {
  try {
    const allergy = await patients_allergies.findById(req.params.id);
    if (!allergy) {
      return res.status(404).json({ message: 'Patient allergy not found' });
    }
    res.status(200).json(allergy);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching patient allergy', error });
  }
});

// PUT /patients-allergies/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedAllergy = await patients_allergies.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAllergy) {
      return res.status(404).json({ message: 'Patient allergy not found' });
    }
    res.status(200).json(updatedAllergy);
  } catch (error) {
    res.status(400).json({ message: 'Error updating patient allergy', error });
  }
});

// DELETE /patients-allergies/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedAllergy = await patients_allergies.findByIdAndDelete(req.params.id);
    if (!deletedAllergy) {
      return res.status(404).json({ message: 'Patient allergy not found' });
    }
    res.status(200).json({ message: 'Patient allergy deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting patient allergy', error });
  }
});

module.exports = router;