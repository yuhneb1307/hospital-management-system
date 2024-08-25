const express = require('express');
const router = express.Router();
const appointment_notes = require('../models/appointment_notes'); // Import the model

// GET all appointment notes
router.get('/', async (req, res) => {
  try {
    const notes = await appointment_notes.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /appointment-notes
router.post('/', async (req, res) => {
  try {
    const newNote = new appointment_notes(req.body);
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ message: 'Error adding appointment note', error });
  }
});

// GET /appointment-notes/:id - Get an appointment note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await appointment_notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Appointment note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching appointment note', error });
  }
});

// PUT /appointment-notes/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedNote = await appointment_notes.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: 'Appointment note not found' });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: 'Error updating appointment note', error });
  }
});

// DELETE /appointment-notes/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedNote = await appointment_notes.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: 'Appointment note not found' });
    }
    res.status(200).json({ message: 'Appointment note deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting appointment note', error });
  }
});

module.exports = router;