const Departments = require("../models/departments");

// READ
exports.getAllDepartments = async (req, res) => {
  // Logic to get all departments
  Departments.getAllDepartments((err, departments) => {
    if (err) throw err;
    callback(departments);
  });
};

exports.getDepartmentById = async (req, res) => {
  const id = req.body.id;

  Departments.getDepartmentById(id, (err, departments) => {
    if (err) throw err;
    res.json(departments);
  });
};
