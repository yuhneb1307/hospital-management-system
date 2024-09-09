const Staffs = require("../models/staffs");

// READ
exports.getAllStaffs = (req, res) => {
  Staffs.getAllStaffs((err, staffs) => {
    if (err) {
      console.error('Error fetching staffs:', err);
      return res.status(500).json({ error: 'Failed to retrieve staffs.' });
    }
    res.render("staffsList", { staffs }); // Render the EJS view with staff data
  });
};

exports.getAllDoctors = async (req, res) => {
  try {
    Staffs.getAllDoctors((err, staffs) => {
      if (err) throw err;
      res.json(staffs);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllNurses = async (req, res) => {
  try {
    Staffs.getAllNurses((err, staffs) => {
      if (err) throw err;
      res.json(staffs);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStaffById = (id, callback) => {
  Staffs.getStaffById(id, (err, staffs) => {
    if (err) throw err;
    callback(staffs);
  });
};

exports.getDoctorByDepartment = async (req, res) => {
  try {
    const id = req.params.id;
    Staffs.getDoctorByDepartment(id, (err, staffs) => {
      if (err) throw err;
      res.json(staffs);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStaffByDataOrder = async (req, res) => {
  try {
    const order = req.params.order;
    const data = req.params.data;
    Staffs.getStaffByDataOrder(data, order, (err, staffs) => {
      if (err) throw err;
      res.json(staffs);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    Staffs.checkLogIn(email, password, (err, staffs) => {
      if (err) throw err;
      res.json(staffs);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE
exports.createStaff = async (req, res) => {
  try {
    const staff = req.body; // Directly use req.body to capture all fields
    Staffs.createStaff(staff, (err, staffs) => {
      if (err) throw err;
      res.json({ message: "Staff created successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updateStaff = async (req, res) => {
  try {
    const id = req.body.id;
    const staff = req.body;
    Staffs.updateStaff(staff, id, (err, result) => {
      if (err) throw err;
      res.redirect('/staffs/' + id);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
exports.deleteStaff = async (req, res) => {
  try {
    const id = req.body.id;
    Staffs.deleteStaff(id, (err, result) => {
      if (err) throw err;
      res.json({ message: "Staff deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};