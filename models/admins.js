const db = require("../config/db");

// READ
exports.getAllAdmins = function (callback) {
  db.query("SELECT * FROM admin", callback);
};

exports.getAdminById = function (id, callback) {
  db.query("SELECT * FROM admin WHERE id = ?", [id], callback);
};

exports.getAdminsById = function (id, callback) {
  db.query("SELECT * FROM admin WHERE id IN (?)", [id], callback);
};


exports.getAdminByDataOrder = function (data, order, callback) {
  if (order == "asc") {
    db.query(`SELECT * FROM admin ORDER BY ${data} ASC`, callback);
  } else if (order == "desc") {
    db.query(`SELECT * FROM admin ORDER BY ${data} DESC`, callback);
  }
};

exports.checkLogIn = function (email, password, callback) {
  db.query(`SELECT * FROM admin WHERE email = ? AND password = ? LIMIT 1`, [email, password], callback);
};

// CREATE
exports.createAdmin = function (newAdmin, callback) {
  db.query("INSERT INTO admin SET ?", [newAdmin], callback);
};

// UPDATE
exports.updateAdmin = function (updatedAdmin, id, callback) {
  db.query("UPDATE admin SET ? WHERE id = ?", [updatedAdmin, id], callback);
};

// DELETE
exports.deleteAdmin = function (id, callback) {
  db.query("DELETE FROM admin WHERE id = ?", [id], callback);
};
