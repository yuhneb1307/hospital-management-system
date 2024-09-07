const Admins = require("../models/admins");

// READ
exports.getAllAdmins = async (req, res) => {
  // Logic to get all admins
  Admins.getAllAdmins((err, admins) => {
    if (err) throw err;
    callback(admins);
  });
};

exports.getAdminById = async (req, res) => {
  const id = req.params.id;

  Admins.getAdminById(id, (err, admins) => {
    if (err) throw err;
    res.json(admins);
  });
};

exports.getAdminById = (id, callback) => {
  Admins.getAdminById(id, (err, admins) => {
    if (err) throw err;
    callback(admins);
  });
};

exports.getAdminByID = async (req, res) => {
  console.log(req);
  // const id = req.body.id;

  // Admins.getAdminById(id, (err, admins) => {
  //   if (err) throw err;
  //   res.json(admins);
  // });
};
exports.getAdminByDataOrder = async (req, res) => {
  const order = req.params.order;
  const data = req.params.data;

  Admins.getAdminByDataOrder(data, order, (err, admins) => {
    if (err) throw err;
    res.json(admins);
  });
};

exports.checkLogIn = async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  Admins.checkLogIn(email, password, (err, admins) => {
    if (err) throw err;
    res.json(admins);
  });
};

//CREATE
exports.createAdmin = async (req, res) => {
  const admin = {
    id: req.body.id,
    email: req.body.email,
    password: req.body.password,
  };
  Admins.createAdmin(admin, (err, admins) => {
    if (err) throw err;
    res.json({ message: "Admin created successfully" });
  });
};

// UPDATE
exports.updateAdmin = async (req, res) => {
  const id = req.body.id;
  const admin = {
    id: req.body.id,
    email: req.body.email,
    password: req.body.password,
  };

  Admins.updateAdmin(admin, id, (err, result) => {
    if (err) throw err;
    res.json({ message: "Admin updated successfully" });
  });
};

// DELETE
exports.deleteAdmin = async (req, res) => {
  const id = req.body.id;
  Admins.deleteAdmin(id, (err, result) => {
    if (err) throw err;
    res.json({ message: "admin deleted successfully" });
  });
};
