const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patientsController.js");
router.use(express.static("public"));
const appointment = require("../models/appointments.js"); // Import the model
const allergy = require("../models/allergy.js"); // Import the model
const staff = require("../models/staff_documents.js"); // Import the model


// Routes
router.get("/", (req, res) => {
  patientsController.getAllPatients((patients) => {
    res.render("patients", { patients });
  });
});

// READD
router.get("/search/:id", async (req, res) => {
  patientsController.getPatientById(req.params.id, (patient) => {
    // console.log(patient);
    res.json(patient);
  });
});

router.get("/:id", async (req, res) => {
  var appointment_object = await appointment.find({ patient_id: req.params.id }).exec();
  var allergy_object = await allergy.find({ patient_id: req.params.id }).exec();
  // var staff_object = await staff.find({ staff_id: req.params.id }).exec();
  // console.log(staff_object);
  
  patientsController.getPatientById(req.params.id, (patient) => {
    res.render("patient-infor", {
      patient: patient[0],
      appointment_notes: appointment_object,
      allergy: allergy_object,
    });
  });
});
router.get("/", patientsController.getAllPatients);
// router.get("/", patientsController.getAllPatients);
router.get("/search/:data", patientsController.getPatientById);
router.get("/sort/:data/:order", patientsController.getPatientByDataOrder);
// router.get("/login", patientsController.checkLogIn);
router.get("/search/allergy", patientsController.getPatientById);

// CREATE
router.post("/", patientsController.createPatient);
router.post("/login", patientsController.checkLogIn);

//UPDATE
router.post("/update", patientsController.updatePatient);
// DELETE
router.delete("/", patientsController.deletePatient);

module.exports = router;
