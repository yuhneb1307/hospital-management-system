const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patientsController.js");
router.use(express.static("public"));
const appointment = require("../models/appointments.js"); // Import the model
const allergy = require("../models/allergy.js"); // Import the model
const Staffs = require("../models/staffs.js"); // Import the model
const departments = require("../models/department.js"); // Import the model

// ROUTES

// Home route - Fetch all patients
router.get("/", (req, res) => {
  patientsController.getAllPatients((patients) => {
    res.render("patients", { patients });
  });
});

// Get a specific patient by ID
router.get("/search/:id", (req, res) => {
  patientsController.getPatientById(req.params.id, (patient) => {
    res.json(patient);
  });
});

// Fetch detailed information about a specific patient
router.get("/:id", async (req, res) => {
  try {
    const appointment_object = await appointment.find({ patient_id: req.params.id }).exec();
    const allergy_object = await allergy.find({ patient_id: req.params.id }).exec();
    const staff_ids = appointment_object.map((app) => app.staff_id);
router.get("/update-data", async (req, res) => {
  try {
    let Now = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
    const past_appointment_object = await appointment
      .updateMany({}, [
        {
          $set: {
            status: {
              $switch: {
                branches: [
                  {
                    case: { $eq: ["$date_of_appointment", Now] },
                    then: "During",
                  },
                  {
                    case: { $lt: ["$date_of_appointment", Now] },
                    then: "Completed",
                  },
                  {
                    case: { $gt: ["$date_of_appointment", Now] },
                    then: "Pending",
                  },
                ],
                default: "Completed",
              },
            },
          },
        },
      ])
      .then((data) => {
        res.json(data);
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const appointment_object = await appointment
      .find({ patient_id: req.params.id })
      .exec();
    const staff_ids = appointment_object.map((app) => app.staff_id);

    // let NOW = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
    // let Now = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
    // const past_appointment_object = await appointment
    //   .find({
    //     date_of_appointment: { $lt: NOW },
    //     patient_id: req.params.id,
    //   })
    //   .exec();

    // const now_appointment_object = await appointment
    //   .find({
    //     date_of_appointment: Now,
    //     patient_id: req.params.id,
    //   })
    //   .exec();

    // const future_appointment_object = await appointment
    //   .find({
    //     date_of_appointment: { $gt: NOW },
    //     patient_id: req.params.id,
    //   })
    //   .exec();

    const allergy_object = await allergy
      .find({ patient_id: req.params.id })
      .exec();

    patientsController.getPatientById(req.params.id, (patient) => {
      if (!patient || patient.length === 0) {
        return res.status(404).send("Patient not found");
      }

      const renderPatientInfo = (staffData) => {
      if (staff_ids.length > 0) {
        Staffs.getStaffsById(staff_ids, (err, staffs) => {
          if (err) throw err;

          departments.getAllDepartments((err, departments) => {
            if (err) throw err;
            Staffs.getAllStaffs((err, all_staffs)=>{
            if (err) throw err;
            res.render("patient-infor", {
              patient: patient[0],
              appointment_notes: appointment_object,
              allergy: allergy_object[0],
              staff: staffs,
              departments: departments,
              all_staffs: all_staffs,
            });
            })
          });
        });
      } else {
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
          if (err) return res.status(500).send("Failed to fetch departments.");
          res.render("patient-infor", {
            patient: patient[0],
            appointment_notes: appointment_object,
            allergy: allergy_object[0],
            staff: staffData,
            departments: departments,
          });
        });
      };

      if (staff_ids.length > 0) {
        staffs.getStaffsById(staff_ids, (err, staffData) => {
          if (err) return res.status(500).send("Failed to fetch staff.");
          renderPatientInfo(staffData);
        });
      } else {
        renderPatientInfo([]);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Paginated and filtered patients list
router.get("/paginated", (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const searchTerm = req.query.search || ''; // Extract search term from query
router.get("/", patientsController.getAllPatients);
// router.get("/", patientsController.getAllPatients);
router.get("/search/:data", patientsController.getPatientByDataOrder);
router.get("/sort/:data/:order", patientsController.getPatientByDataOrder);
// router.get("/login", patientsController.checkLogIn);
router.get("/search/allergy", patientsController.getPatientById);

  patientsController.getPaginatedPatients(page, searchTerm, (err, patientsData) => {
    if (err) {
      console.error('Error fetching paginated patients:', err);
      return res.status(500).json({ error: 'Failed to fetch patients.' });
    }
    res.json(patientsData);
  });
});

// Sort patients by a specified field in ascending or descending order
router.get("/sort/:data/:order", (req, res) => {
  patientsController.getPatientByDataOrder(req.params.data, req.params.order, (patients) => {
    res.json(patients);
  });
});

// Create a new patient
router.post("/", (req, res) => {
  patientsController.createPatient(req.body, (err, result) => {
    if (err) return res.status(500).send("Failed to create patient.");
    res.redirect("/"); // Redirect after successful creation
  });
});

// Update a patient's details
router.post("/update/:id", (req, res) => {
  patientsController.updatePatient(req.body, req.params.id, (err, patients) => {
    if (err) return res.status(500).send("Failed to update patient.");
    res.render("patients", { patients });
  });
});

// Delete a patient
router.delete("/", (req, res) => {
  patientsController.deletePatient(req.body.id, (err, result) => {
    if (err) return res.status(500).send("Failed to delete patient.");
    res.json({ success: true });
  });
});

module.exports = router;