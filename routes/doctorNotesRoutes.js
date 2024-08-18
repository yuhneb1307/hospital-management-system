const express = require('express');
const router = express.Router();
const doctor_notes = require('../models/doctor_notes');

// Get all doctor notes
router.get('/', async (req, res) => {
  try {
    const notes = await doctor_notes.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new doctor note
router.post('/', async (req, res) => {
  const note = new doctor_notes({
    patient_id: req.body.patient_id,
    observations: req.body.observations,
    diagnosis: req.body.diagnosis,
    treatment_plan: req.body.treatment_plan,
    related_appointment_notes: req.body.related_appointment_notes
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Other routes (get one note, update, delete) can be added similarly

module.exports = router;