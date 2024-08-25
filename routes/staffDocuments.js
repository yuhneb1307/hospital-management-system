const express = require('express');
const router = express.Router();
const staff_documents = require('../models/staff_documents'); // Import the model

// GET all staff documents
router.get('/', async (req, res) => {
  try {
    const documents = await staff_documents.find();
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /staff-documents
router.post('/', async (req, res) => {
  try {
    const newDocument = new staff_documents(req.body);
    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    res.status(400).json({ message: 'Error adding staff document', error });
  }
});

// GET /staff-documents/:id - Get staff document by ID
router.get('/:id', async (req, res) => {
  try {
    const document = await staff_documents.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Staff document not found' });
    }
    res.status(200).json(document);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching staff document', error });
  }
});

// PUT /staff-documents/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedDocument = await staff_documents.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDocument) {
      return res.status(404).json({ message: 'Staff document not found' });
    }
    res.status(200).json(updatedDocument);
  } catch (error) {
    res.status(400).json({ message: 'Error updating staff document', error });
  }
});

// DELETE /staff-documents/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedDocument = await staff_documents.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Staff document not found' });
    }
    res.status(200).json({ message: 'Staff document deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting staff document', error });
  }
});

module.exports = router;