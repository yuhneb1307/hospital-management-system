// import mongoose from "mongoose";
// const Patient = require("../models/Patient");
// const mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "123456",
//   database: "dataproject",
// });

// connection.connect(function (err) {
//   if (err) throw err;
//   console.log("You are now connected with mysql database...");
// });

// let params = {
//     id: 3,
// 	name: "Sibelle Clair",
// 	age: 35,
//     gender: "Female",
//     contact_details: "123 Main St, 1234567890",
//     allergies: "none",
// 	treatment_history: "Physical therapy for back pain",
// }

// connection.query(
//   "INSERT INTO patients SET ? ",
//   params,
//   function (error, results, fields) {
//     if (error) throw error;
//     console.log("Record inserted");
//   }
// );

const Users = require("../models/users");

// exports.createUser = async (req, res) => {
//   // Logic to create a new patient
//   const patient = new Users({
//     // _id: mongoose.Types.ObjectId(),
//     username: req.body.username,
//     password: req.body.password,
//     role: req.body.role, // e.g., admin, doctor, nurse, patient
//     id: req.body.id,
//   });

//   return patient
//     .save()
//     .then((newPatient) => {
//       return res.status(201).json({
//         success: true,
//         message: "New cause created successfully",
//         Patient: newPatient,
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({
//         success: false,
//         message: "Server error. Please try again.",
//         error: error.message,
//       });
//     });
// };

exports.getAllUsers = async (req, res) => {
  // Logic to get all patients
  Users.getAllUsers((err, users) => {
    if (err) throw err;
    res.json(users);
  });
};

exports.getUserById = async (req, res) => {
  const id = req.body.id;

  Users.getUserById(id, (err, users) => {
    if (err) throw err;
    res.json(users);
  });
};

exports.createUser = async (req, res) => {
  const user = {
    id: req.body.id,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    user_id: req.body.user_id,
  };

  Users.createUser(user, (err, users) => {
    if (err) throw err;
    res.json({ message: "User created successfully" });
  });
};

exports.updateUser = async (req, res) => {
  const id = req.body.id;
  const user = {
    id: req.body.id,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    user_id: req.body.user_id,
  };

  Users.updateUser(user, id, (err, result) => {
    if (err) throw err;
    res.json({ message: "User updated successfully" });
  });
};

exports.deleteUser = async (req, res) => {
  const id = req.body.id;
  Users.deleteUser(id, (err, result) => {
    if (err) throw err;
    res.json({ message: "user deleted successfully" });
  });
};
