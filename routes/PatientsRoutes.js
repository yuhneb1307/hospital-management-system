const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patientsController.js");
router.use(express.static("public"));
const appointment = require("../models/appointments.js"); // Import the model
const allergy = require("../models/allergy.js"); // Import the model
const staffs = require("../models/staffs.js"); // Import the model
const departments = require("../models/department.js"); // Import the model

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
  try {
    const appointment_object = await appointment
      .find({ patient_id: req.params.id })
      .exec();

    const allergy_object = await allergy
      .find({ patient_id: req.params.id })
      .exec();
      
    const staff_ids = appointment_object.map((app) => app.staff_id);

    patientsController.getPatientById(req.params.id, (patient) => {
      if (!patient || patient.length === 0) {
        return res.status(404).send("Patient not found");
      }

      if (staff_ids.length > 0) {
        staffs.getStaffsById(staff_ids, (err, staffs) => {
          if (err) throw err;

          departments.getAllDepartments((err, departments) => {
            if (err) throw err;
            res.render("patient-infor", {
              patient: patient[0],
              appointment_notes: appointment_object,
              allergy: allergy_object[0],
              staff: staffs,
              departments: departments,
            });
          });
        });
      } 
      else {
        const staff = {
          id: 0,
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          role: "",
          department_id: 0,
          schedule: "",
          salary: 0,
          managed_by: null,
          gender: null,
        };

        departments.getAllDepartments((err, departments) => {
          if (err) throw err;
          res.render("patient-infor", {
            patient: patient[0],
            appointment_notes: appointment_object,
            allergy: allergy_object[0],
            staff: staff,
            departments: departments,
          });
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
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
router.post("/update/:id", (req, res) => {
  patientsController.updatePatient(req, res, (patients) => {
    res.render("patients", { patients });
  });
});
// DELETE
router.delete("/", patientsController.deletePatient);

module.exports = router;
