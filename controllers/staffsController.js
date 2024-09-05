const Staffs = require("../models/staffs");

// READ
exports.getAllStaffs = async (req, res) => {
  // Logic to get all staffs
  Staffs.getAllStaffs((err, staffs) => {
    if (err) throw err;
    callback(staffs);
  });
};

exports.getStaffById = async (req, res) => {
  const id = req.body.id;

  Staffs.getStaffById(id, (err, staffs) => {
    if (err) throw err;
    res.json(staffs);
  });
};

exports.getStaffByDataOrder = async (req, res) => {
  const order = req.params.order;
  const data = req.params.data;

  Staffs.getStaffByDataOrder(data, order, (err, staffs) => {
    if (err) throw err;
    res.json(staffs);
  });
};

//CREATE
exports.createStaff = async (req, res) => {
  const staff = {
    id: req.body.id,
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    contact_details: req.body.contact_details,
    allergies: req.body.allergies,
    treatment_history: req.body.treatment_history,
  };

  Staffs.createStaff(staff, (err, staffs) => {
    if (err) throw err;
    res.json({ message: "Staff created successfully" });
  });
};

// UPDATE
exports.updateStaff = async (req, res) => {
  const id = req.body.id;
  const staff = {
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    role: req.body.tole,
    department_id: req.body.department_id,
    schedule: req.body.schedule,
    salary: req.body.salary,
    managed_by: req.body.managed_by,
  };

  Staffs.updateStaff(staff, id, (err, result) => {
    if (err) throw err;
    res.json({ message: "Staff updated successfully" });
  });
};

// DELETE
exports.deleteStaff = async (req, res) => {
  const id = req.body.id;
  Staffs.deleteStaff(id, (err, result) => {
    if (err) throw err;
    res.json({ message: "staff deleted successfully" });
  });
};
