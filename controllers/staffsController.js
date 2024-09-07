const Staffs = require("../models/staffs");

// READ
exports.getAllStaffs = async (req, res) => {
  // Logic to get all staffs
  Staffs.getAllStaffs((err, staffs) => {
    if (err) throw err;
    callback(staffs);
  });
};

exports.getAllDoctors = async (req, res) => {
  // Logic to get all staffs
  Staffs.getAllDoctors((err, staffs) => {
    if (err) throw err;
    res.json(staffs);
  });
};

exports.getAllNurses = async (req, res) => {
  // Logic to get all staffs
  Staffs.getAllNurses((err, staffs) => {
    if (err) throw err;
    res.json(staffs);
  });
};

exports.getStaffById = async (req, res) => {
  const id = req.params.id;

  Staffs.getStaffById(id, (err, staffs) => {
    if (err) throw err;
    res.json(staffs);
  });
};

exports.getStaffById = (id, callback) => {
  Staffs.getStaffById(id, (err, staffs) => {
    if (err) throw err;
    callback(staffs);
  });
};

exports.getStaffByID = async (req, res) => {
  console.log(req);
  // const id = req.body.id;

  // Staffs.getStaffById(id, (err, staffs) => {
  //   if (err) throw err;
  //   res.json(staffs);
  // });
};
exports.getStaffByDataOrder = async (req, res) => {
  const order = req.params.order;
  const data = req.params.data;

  Staffs.getStaffByDataOrder(data, order, (err, staffs) => {
    if (err) throw err;
    res.json(staffs);
  });
};

exports.checkLogIn = async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  Staffs.checkLogIn(email, password, (err, staffs) => {
    if (err) throw err;
    res.json(staffs);
  });
};

//CREATE
exports.createStaff = async (req, res) => {
  const staff = {
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    department_id: req.body.department_id,
    schedule: req.body.schedule,
    salary: req.body.salary,
    managed_by: req.body.managed_by,
    gender: req.body.gender,
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
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    department_id: req.body.department_id,
    schedule: req.body.schedule,
    salary: req.body.salary,
    managed_by: req.body.managed_by,
    gender: req.body.gender,
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
