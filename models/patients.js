const db = require("../config/db");

// READ
exports.getAllPatients = function (callback) {
  db.query("SELECT * FROM patients", callback);
};

exports.getPatientById = function (id, callback) {
  db.query("SELECT * FROM patients WHERE id = ?", [id], callback);
};

exports.getPatientByDataOrder = function (data, order, callback) {
  if (order == "asc") {
    db.query(`SELECT * FROM patients ORDER BY ${data} ASC`, callback);
  } else if (order == "desc") {
    db.query(`SELECT * FROM patients ORDER BY ${data} DESC`, callback);
  }
};

exports.checkLogIn = function (email, password, callback) {
    db.query(`SELECT * FROM patients WHERE email = ? AND password = ? LIMIT 1`, [email, password], callback);
};

// CREATE
exports.createPatient = function (newPatient, callback) {
  db.query("INSERT INTO patients SET ?", [newPatient], callback);
};

// UPDATE
exports.updatePatient = function (updatedPatient, id, callback) {
  db.query(
    "UPDATE patients SET ? WHERE id = ?",
    [updatedPatient, id],
    callback
  );
};

// DELETE
exports.deletePatient = function (id, callback) {
  db.query("DELETE FROM patients WHERE id = ?", [id], callback);
};
