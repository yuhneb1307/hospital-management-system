const db = require("../config/db");

// READ ALL PATIENTS
exports.getAllPatients = function (callback) {
  db.query("SELECT * FROM patients", callback);
};

// GET TOTAL NUMBER OF PATIENTS
exports.getTotalPatients = function (callback) {
  db.query("SELECT COUNT(*) AS total FROM patients", callback);
};

// GET PATIENTS WITH PAGINATION AND SEARCH
exports.getPaginatedPatients = (page, searchTerm, callback) => {
  const limit = 250; // Number of patients per page
  const offset = (page - 1) * limit; // Calculate offset based on page number

  let countQuery = "SELECT COUNT(*) AS total FROM patients";
  let searchQuery = "SELECT * FROM patients ORDER BY id LIMIT ? OFFSET ?";

  // Modify queries if a search term is provided
  if (searchTerm) {
    countQuery = `SELECT COUNT(*) AS total FROM patients WHERE first_name LIKE ? OR last_name LIKE ?`;
    searchQuery = `SELECT * FROM patients WHERE first_name LIKE ? OR last_name LIKE ? ORDER BY id LIMIT ? OFFSET ?`;
  }

  // Fetch total count for pagination
  db.query(countQuery, searchTerm ? [`%${searchTerm}%`, `%${searchTerm}%`] : [], (err, totalResult) => {
    if (err) return callback(err, null);

    const totalPatients = totalResult[0].total;
    const totalPages = Math.ceil(totalPatients / limit);

    // Fetch patients based on pagination and search
    db.query(
      searchQuery,
      searchTerm ? [`%${searchTerm}%`, `%${searchTerm}%`, limit, offset] : [limit, offset],
      (err, patients) => {
        if (err) return callback(err, null);

        callback(null, {
          currentPage: page,
          totalPages: totalPages,
          data: patients,
        });
      }
    );
  });
};

// GET PATIENTS BY PAGINATION
exports.getPatientsByPagination = function (offset, limit, callback) {
  db.query("SELECT * FROM patients ORDER BY id LIMIT ? OFFSET ?", [limit, offset], callback);
};

// GET PATIENT BY ID
exports.getPatientById = function (id, callback) {
  db.query("SELECT * FROM patients WHERE id = ?", [id], callback);
};

// GET PATIENTS BY DATA ORDER
exports.getPatientByDataOrder = function (data, order, callback) {
  if (order === "asc") {
    db.query(`SELECT * FROM patients ORDER BY ${data} ASC`, callback);
  } else if (order === "desc") {
    db.query(`SELECT * FROM patients ORDER BY ${data} DESC`, callback);
  }
};

exports.getPatientByDoctorIDOrder = function (id, data, order, callback) {
  if (order == "asc") {
    db.query(`SELECT * FROM patients WHERE doctor_id = ${id} ORDER BY ${data} ASC`, callback);
  } else if (order == "desc") {
    db.query(`SELECT * FROM patients WHERE doctor_id = ${id} ORDER BY ${data} DESC`, callback);
  }
};

exports.checkLogIn = function (email, password, callback) {
  db.query(`SELECT * FROM patients WHERE email = ? AND password = ? LIMIT 1`, [email, password], callback);
};

// CREATE A NEW PATIENT
exports.createPatient = function (newPatient, callback) {
  db.query("INSERT INTO patients SET ?", [newPatient], callback);
};

// UPDATE A PATIENT
exports.updatePatient = function (updatedPatient, id, callback) {
  db.query("UPDATE patients SET ? WHERE id = ?", [updatedPatient, id], callback);
};

// DELETE A PATIENT
exports.deletePatient = function (id, callback) {
  db.query("DELETE FROM patients WHERE id = ?", [id], callback);
};



exports.countPatients = function ( callback) {
  db.query("SELECT COUNT(id) AS patient_no FROM Patients;", callback);
};