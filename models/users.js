const db = require("../config/db");

exports.getAllUsers = function (callback) {
  db.query("SELECT * FROM Users", callback);
};

exports.getUserById = function (id, callback) {
  db.query("SELECT * FROM Users WHERE id = ?", [id], callback);
};

exports.createUser = function (newUser, callback) {
  db.query("INSERT INTO users SET ?", [newUser], callback);
};

exports.updateUser = function (updatedUser, id, callback) {
  db.query("UPDATE Users SET ? WHERE id = ?", [updatedUser, id], callback);
};

exports.deleteUser = function (id, callback) {
  db.query("DELETE FROM Users WHERE id = ?", [id], callback);
};
