const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffsController.js");
router.use(express.static("public"));
const patients = require("../models/patients.js"); // Import the model
const appointment = require("../models/appointments.js"); // Import the model
const Departments = require("../models/department.js"); // Import the model

// Routes
router.get("/", staffController.getAllStaffs);
// READ
// router.get("/search", staffController.getStaffById);
router.get("/:id", async (req, res) => {
  try {
    var appointment_object = await appointment
      .find({ staff_id: req.params.id })
      .exec();

    const patient_ids = appointment_object.map((app) => app.patient_id);
    console.log(patient_ids);

    

    staffController.getStaffById(req.params.id, (staff) => {
      if (!staff || staff.length === 0) {
        return res.status(404).send("Staff not found");
      }
      patients.getPatientByDoctorIDOrder(
        req.params.id,
        "doctor_id",
        "asc",
        (err, patient_list_doc) => {
          if (patient_ids.length != 0) {
            patients.getListPatientByIds(patient_ids, (patients_list) => {
              console.log(patients_list);
            });
          }
          res.render("doctor", {
            staff: staff[0],
            patients: patient_list_doc,
            appointment_object: appointment_object,
          });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/doctor/department/:id", staffController.getDoctorByDepartment);
router.get("/doctors", staffController.getAllDoctors);
router.get("/nurse", staffController.getAllNurses);
router.get("/search/:id", staffController.getStaffById);
router.get("/sort/:data/:order", staffController.getStaffByDataOrder);
router.get("/search/allergy", staffController.getStaffById);

// CREATE
router.post("/", staffController.createStaff);
router.post("/login", staffController.checkLogIn);

//UPDATE
router.post("/update/:id", (req, res) => {
  staffController.updateStaff(req, res, (staffs) => {
    res.render("staffs", { staffs });
  });
});
// DELETE
router.delete("/", staffController.deleteStaff);

module.exports = router;
