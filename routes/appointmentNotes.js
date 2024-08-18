const express = require('express');
const router = express.Router();
const AppointmentNotes = require('../models/appointment_notes'); // Import the model

// GET all appointment notes
router.get('/', async (req, res) => {
  try {
    const notes = await AppointmentNotes.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;