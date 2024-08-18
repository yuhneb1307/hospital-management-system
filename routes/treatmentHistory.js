const express = require('express');
const router = express.Router();
const treatment_history = require('../models/treatment_history'); // Import the model

// GET all treatment histories
router.get('/', async (req, res) => {
  try {
    const histories = await treatment_history.find();
    res.json(histories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /treatment-history
app.post('/treatment-history', async (req, res) => {
  try {
    const newTreatment = new TreatmentHistory(req.body);
    const savedTreatment = await newTreatment.save();
    res.status(201).json(savedTreatment);
  } catch (error) {
    res.status(400).json({ message: 'Error adding treatment history', error });
  }
});

// PUT /treatment-history/:id
app.put('/treatment-history/:id', async (req, res) => {
  try {
    const updatedTreatment = await TreatmentHistory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTreatment) {
      return res.status(404).json({ message: 'Treatment history not found' });
    }
    res.status(200).json(updatedTreatment);
  } catch (error) {
    res.status(400).json({ message: 'Error updating treatment history', error });
  }
});

// DELETE /treatment-history/:id
app.delete('/treatment-history/:id', async (req, res) => {
  try {
    const deletedTreatment = await TreatmentHistory.findByIdAndDelete(req.params.id);
    if (!deletedTreatment) {
      return res.status(404).json({ message: 'Treatment history not found' });
    }
    res.status(200).json({ message: 'Treatment history deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting treatment history', error });
  }
});


module.exports = router;