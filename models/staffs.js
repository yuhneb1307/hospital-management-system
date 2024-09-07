const db = require("../config/db");

// READ
exports.getAllStaffs = function (callback) {
  db.query("SELECT * FROM staff", callback);
};

exports.getAllDoctors = function (callback) {
  db.query("SELECT * FROM staff WHERE role = 'Doctor'", callback);
};

exports.getAllNurses = function (callback) {
  db.query("SELECT * FROM staff WHERE role = 'Nurse'", callback);
};

exports.getStaffById = function (id, callback) {
  db.query("SELECT * FROM staff WHERE id = ?", [id], callback);
};

exports.getStaffsById = function (id, callback) {
  db.query("SELECT * FROM staff WHERE id IN (?)", [id], callback);
};


exports.getStaffByDataOrder = function (data, order, callback) {
  if (order == "asc") {
    db.query(`SELECT * FROM staff ORDER BY ${data} ASC`, callback);
  } else if (order == "desc") {
    db.query(`SELECT * FROM staff ORDER BY ${data} DESC`, callback);
  }
};

exports.checkLogIn = function (email, password, callback) {
  db.query(`SELECT * FROM staff WHERE email = ? AND password = ? LIMIT 1`, [email, password], callback);
};

// CREATE
exports.createStaff = function (newStaff, callback) {
  db.query("INSERT INTO staff SET ?", [newStaff], callback);
};

// UPDATE
exports.updateStaff = function (updatedStaff, id, callback) {
  db.query("UPDATE staff SET ? WHERE id = ?", [updatedStaff, id], callback);
};

// DELETE
exports.deleteStaff = function (id, callback) {
  db.query("DELETE FROM staff WHERE id = ?", [id], callback);
};
