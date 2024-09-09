const db = require("../config/db");

// READ
exports.getAllEmergency = function (callback) {
  db.query("SELECT * FROM emergency_contacts", callback);
};

exports.getEmergencyContactById = function (id, callback) {
  db.query("SELECT * FROM emergency_contacts WHERE id = ?", [id], callback);
};

exports.getEmergencyContactByIds = function (id, callback) {
  db.query("SELECT * FROM emergency_contacts WHERE id IN (?)", [id], callback);
};

// CREATE
exports.createEmergencyContact = function (newEmergencyContact, callback) {
  db.query("INSERT INTO emergency_contacts SET ?", [newEmergencyContact], callback);
};

// UPDATE
exports.updateEmergencyContact = function (updatedEmergencyContact, id, callback) {
  db.query("UPDATE emergency_contacts SET ? WHERE id = ?", [updatedEmergencyContact, id], callback);
};

// DELETE
exports.deleteEmergencyContact = function (id, callback) {
  db.query("DELETE FROM emergency_contacts WHERE id = ?", [id], callback);
};
