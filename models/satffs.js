const db = require("../config/db");

// READ
exports.getAllStaffs = function (callback) {
  db.query("SELECT * FROM staffs", callback);
};

exports.getAllDoctors = function (callback) {
  db.query("SELECT * FROM staffs WHERE role = 'Doctor'", callback);
};

exports.getAllNurses = function (callback) {
  db.query("SELECT * FROM staffs WHERE role = 'Nurse'", callback);
};

exports.getStaffById = function (id, callback) {
  db.query("SELECT * FROM staffs WHERE id = ?", [id], callback);
};

exports.getStaffByDataOrder = function (data, order, callback) {
  if (order == "asc") {
    db.query(`SELECT * FROM staffs ORDER BY ${data} ASC`, callback);
  } else if (order == "desc") {
    db.query(`SELECT * FROM staffs ORDER BY ${data} DESC`, callback);
  }
};

// CREATE
exports.createStaff = function (newStaff, callback) {
  db.query("INSERT INTO staffs SET ?", [newStaff], callback);
};

// UPDATE
exports.updateStaff = function (updatedStaff, id, callback) {
  db.query("UPDATE staffs SET ? WHERE id = ?", [updatedStaff, id], callback);
};

// DELETE
exports.deleteStaff = function (id, callback) {
  db.query("DELETE FROM staffs WHERE id = ?", [id], callback);
};
