const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patientsController.js");
router.use(express.static("public"));
const appointment = require("../models/appointments.js"); // Import the model
const allergy = require("../models/allergy.js"); // Import the model
const staffs = require("../models/staffs.js"); // Import the model


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
  var staff_ids = [];

  for (let appointment of appointment_object) {
    staff_ids.push(appointment.staff_id);
  }

  console.log(staff_ids);

  patientsController.getPatientById(req.params.id, (patient) => {
    staffs.getStaffsById(staff_ids, (err, staffs) => {
      if (err) throw err;
      res.render("patient-infor", {
        patient: patient[0],
        appointment_notes: appointment_object,
        allergy: allergy_object[0],
        staff: staffs,
      });
    });
    // .getStaffById(staff_id, (staff) => {
    //   console.log(staff);
    //   res.render("patient-infor", {
    //     patient: patient[0],
    //     appointment_notes: appointment_object,
    //     allergy: allergy_object[0],
    //     staff: staff,
    //   });
    // });
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
router.post("/update/:id", patientsController.updatePatient);
// DELETE
router.delete("/", patientsController.deletePatient);

module.exports = router;
