const express = require('express');
const router = express.Router();
const doctor_notes = require('../models/doctor_notes'); // Import the model

// GET all doctor notes
router.get('/', async (req, res) => {
  try {
    const notes = await doctor_notes.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /doctor-notes
router.post('/', async (req, res) => {
  try {
    const newNote = new doctor_notes(req.body);
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ message: 'Error adding doctor note', error });
  }
});

// GET /doctor-notes/:id - Get a doctor note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await doctor_notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Doctor note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching doctor note', error });
  }
});

// PUT /doctor-notes/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedNote = await doctor_notes.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: 'Doctor note not found' });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: 'Error updating doctor note', error });
  }
});

// DELETE /doctor-notes/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedNote = await doctor_notes.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: 'Doctor note not found' });
    }
    res.status(200).json({ message: 'Doctor note deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting doctor note', error });
  }
});

module.exports = router;