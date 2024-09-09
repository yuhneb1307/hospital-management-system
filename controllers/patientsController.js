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
exports.getPaginatedPatients = (page, searchTerm = '', callback) => {
  const limit = 250; // Number of patients per page
  const offset = (page - 1) * limit; // Calculate offset based on page number

  let query = "SELECT * FROM patients";
  let queryParams = [];

  // Add search filter if search term is provided
  if (searchTerm) {
    query += " WHERE first_name LIKE ? OR last_name LIKE ?";
    queryParams.push(`%${searchTerm}%`, `%${searchTerm}%`);
  }

  query += " ORDER BY id LIMIT ? OFFSET ?";
  queryParams.push(limit, offset);

  db.query(query, queryParams, (err, patients) => {
    if (err) throw err;

    db.query("SELECT COUNT(*) AS total FROM patients", (err, total) => {
      if (err) throw err;
      const totalPages = Math.ceil(total[0].total / limit);
      callback({
        currentPage: page,
        totalPages: totalPages,
        data: patients,
      });
    });
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

exports.countPatients = async (req, res) => {
  Patients.countPatients( (err, result) => {
    if (err) throw err;
    res.json(result);
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
    password:  req.body.password,
    email:  req.body.email,
    date_of_birth: req.body.date_of_birth,
    gender: req.body.gender,
    phone: req.body.phone,
    address: req.body.address,
    emergency_id: req.body.emergency_id,
    doctor_id: req.body.doctor_id
  };

  Patients.createPatient(patient, (err, patients) => {
    if (err) throw err;
    res.json({ message: "Patient created successfully" });
  });
};

// UPDATE
exports.updatePatient =  (req, res, callback) => {
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
  Patients.updatePatient(patient, id, (err, result) => {
    if (err) throw err;
    Patients.getAllPatients((err, patients) => {
      if (err) throw err;
      res.redirect("/patients/" + id);
      // res.json(patients);
    })
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
