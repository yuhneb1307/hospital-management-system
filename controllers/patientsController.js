const Patients = require("../models/patients");

// READ
exports.getAllPatients = (callback) => {
  // Logic to get all patients
  Patients.getAllPatients((err, patients) => {
    if (err) throw err;
    callback(patients);
  });
};

exports.getPatientById = async (req, res) => {
  const id = req.body.id;

  Patients.getPatientById(id, (err, patients) => {
    if (err) throw err;
    res.json(patients);
  });
};

exports.getPatientByDataOrder = async (req, res) => {
  const order = req.params.order;
  const data = req.params.data;

  Patients.getPatientByDataOrder(data, order, (err, patients) => {
    if (err) throw err;
    res.json(patients);
  });
};

//CREATE
exports.createPatient = async (req, res) => {
  const patient = {
    id: req.body.id,
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    contact_details: req.body.contact_details,
    allergies: req.body.allergies,
    treatment_history: req.body.treatment_history,
  };

  Patients.createPatient(patient, (err, patients) => {
    if (err) throw err;
    res.json({ message: "Patient created successfully" });
  });
};

// UPDATE
exports.updatePatient = async (req, res) => {
  const id = req.body.id;
  const patient = {
    id: req.body.id,
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    contact_details: req.body.contact_details,
    allergies: req.body.allergies,
    treatment_history: req.body.treatment_history,
  };

  Patients.updatePatient(patient, id, (err, result) => {
    if (err) throw err;
    res.json({ message: "Patient updated successfully" });
  });
};

// DELETE
exports.deletePatient = async (req, res) => {
  const id = req.body.id;
  Patients.deletePatient(id, (err, result) => {
    if (err) throw err;
    res.json({ message: "patient deleted successfully" });
  });
};
