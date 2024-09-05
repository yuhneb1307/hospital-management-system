const db = require("../config/db");

// READ
exports.getAllDepartments = function (callback) {
  db.query("SELECT * FROM departments", callback);
};

exports.getDepartmentById = function (id, callback) {
  db.query("SELECT * FROM departments WHERE id = ?", [id], callback);
};
