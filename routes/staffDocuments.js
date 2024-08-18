const express = require('express');
const router = express.Router();
const StaffDocuments = require('../models/staff_documents'); // Import the model

// GET all staff documents
router.get('/', async (req, res) => {
  try {
    const documents = await StaffDocuments.find();
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;