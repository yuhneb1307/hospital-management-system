const PatientDocument = require('../models/PatientDocument');

exports.create = async (req, res) => {
  try {
    const { patientId, documentType, content } = req.body;
    const doc = new PatientDocument({ patientId, documentType, content });
    await doc.save();
    res.status(201).send(doc);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.getByPatientId = async (req, res) => {
  try {
    const documents = await PatientDocument.find({ patientId: req.params.patientId });
    res.status(200).send(documents);
  } catch (err) {
    res.status(400).send(err.message);
  }
};