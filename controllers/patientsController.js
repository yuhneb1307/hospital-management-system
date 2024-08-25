const Patients = require("../models/patients");

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

exports.updatePatient = async (req, res) => {
  const id = req.body.id;
  const patient = {
    id: req.body.id,
    patientname: req.body.patientname,
    password: req.body.password,
    role: req.body.role,
    patient_id: req.body.patient_id,
  };

  Patients.updatePatient(patient, id, (err, result) => {
    if (err) throw err;
    res.json({ message: "Patient updated successfully" });
  });
};

exports.deletePatient = async (req, res) => {
  const id = req.body.id;
  Patients.deletePatient(id, (err, result) => {
    if (err) throw err;
    res.json({ message: "patient deleted successfully" });
  });
};
