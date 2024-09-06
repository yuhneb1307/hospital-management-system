const Patients = require("../models/patients");

// READ
exports.getAllPatients = (callback) => {
  // Logic to get all patients
  Patients.getAllPatients((err, patients) => {
    if (err) throw err;
    callback(patients);
    // res.json(patients);
  });
};

exports.getPatientById = (id, callback) => {
  Patients.getPatientById(id, (err, patients) => {
    if (err) throw err;
    callback(patients);
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

exports.checkLogIn = async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  Patients.checkLogIn(email, password, (err, patients) => {
    if (err) throw err;
    res.json(patients);
  });
};

//CREATE
exports.createPatient = async (req, res) => {
  const patient = {
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    date_of_birth: req.body.date_of_birth,
    gender: req.body.gender,
    phone: req.body.phone,
    address: req.body.address
  };

  Patients.createPatient(patient, (err, patients) => {
    if (err) throw err;
    res.json({ message: "Patient created successfully" });
  });
};

// UPDATE
exports.updatePatient = async (req, res) => {
  const id = req.params.id;
  const patient = {
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    date_of_birth: req.body.date_of_birth,
    gender: req.body.gender,
    phone: req.body.phone,
    address: req.body.address
  };
  console.log(req.body);
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
