const db = require("../config/db");

exports.getAllPatients = function (callback) {
  db.query("SELECT * FROM patients", callback);
};

exports.getPatientById = function (id, callback) {
  db.query("SELECT * FROM patients WHERE id = ?", [id], callback);
};

exports.createPatient = function (newPatient, callback) {
  db.query("INSERT INTO patients SET ?", [newPatient], callback);
};

exports.updatePatient = function (updatedPatient, id, callback) {
  db.query("UPDATE patients SET ? WHERE id = ?", [updatedPatient, id], callback);
};

exports.deletePatient = function (id, callback) {
  db.query("DELETE FROM patients WHERE id = ?", [id], callback);
};
