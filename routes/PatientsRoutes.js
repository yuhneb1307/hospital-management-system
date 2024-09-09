const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patientsController.js");
router.use(express.static("public"));
const appointment = require("../models/appointments.js"); // Import the model
const allergy = require("../models/allergy.js"); // Import the model
const Staffs = require("../models/staffs.js"); // Import the model
const departments = require("../models/department.js"); // Import the model
let now = new Date().toISOString().slice(0, 10); // Use ISO format for dates

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
    var appointment_object = await appointment.find({ patient_id: req.params.id }).exec();
    var upcoming_appointment = await appointment.find({patient_id: req.params.id, date_of_appointment: {"$gt": now}}).exec();
    const staff_ids = appointment_object.map((app) => app.staff_id);

    // console.log(upcoming_appointment);

    var allergy_object = await allergy.find({ patient_id: req.params.id }).exec();

    if (allergy_object.length == 0) {
      allergy_object = [
        {
          _id: null,
          patient_id: null,
          allergy_name: null,
          reation: null,
          severity: null,
          discovered_date: null,
        },
      ];
    }

    patientsController.getPatientById(req.params.id, (patient) => {
      if (!patient || patient.length === 0) {
        return res.status(404).send("Patient not found");
      }

      if (staff_ids.length > 0) {
        Staffs.getStaffsByIds(staff_ids, (err, staffs) => {
          if (err) throw err;

          departments.getAllDepartments((err, departments) => {
            if (err) throw err;
            Staffs.getAllStaffs((err, all_staffs) => {
              if (err) throw err;
              res.render("patient-infor", {
                patient: patient[0],
                appointment_notes: appointment_object,
                allergy: allergy_object[0],
                staff: staffs,
                departments: departments,
                all_staffs: all_staffs,
                upcoming_appointment: upcoming_appointment,
              });
            });
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
          if (err) throw err;
          res.render("patient-infor", {
            patient: patient[0],
            appointment_notes: appointment_object,
            allergy: allergy_object[0],
            staff: staff,
            departments: departments,
            upcoming_appointment: [],
          });
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Update appointment statuses
router.get("/update-data", async (req, res) => {
  try {
    const updateResult = await appointment.updateMany({}, [
      {
        $set: {
          status: {
            $switch: {
              branches: [
                {
                  case: { $eq: ["$date_of_appointment", now] },
                  then: "During",
                },
                {
                  case: { $lt: ["$date_of_appointment", now] },
                  then: "Completed",
                },
                {
                  case: { $gt: ["$date_of_appointment", now] },
                  then: "Pending",
                },
              ],
              default: "Completed",
            },
          },
        },
      },
    ]);
    res.json(updateResult);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Paginated and filtered patients list
router.get("/paginated", (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const searchTerm = req.query.search || ""; // Extract search term from query

  patientsController.getPaginatedPatients(
    page,
    searchTerm,
    (err, patientsData) => {
      if (err) {
        console.error("Error fetching paginated patients:", err);
        return res.status(500).json({ error: "Failed to fetch patients." });
      }
      res.json(patientsData);
    }
  );
});

// Sort patients by a specified field in ascending or descending order
router.get("/sort/:data/:order", (req, res) => {
  patientsController.getPatientByDataOrder(
    req.params.data,
    req.params.order,
    (patients) => {
      res.json(patients);
    }
  );
});

router.get("/count/user", patientsController.countPatients);

// CREATE
router.post("/", patientsController.createPatient);
router.post("/login", patientsController.checkLogIn);
// router.post("/create-appoinment/:id", async (req, res) => {
//   try {
//     const newNote = new appointments(req.body);
//     const savedNote = await newNote.save();
//     res.status(201).json(savedNote);
//   } catch (error) {
//     res.status(400).json({ message: "Error adding appointment note", error });
//   }
// });

//UPDATE
router.post("/update/:id", (req, res) => {
  patientsController.updatePatient(req, res, (patients) => {
    res.render("patients", { patients });
  });
});
// DELETE
router.delete("/", patientsController.deletePatient);

module.exports = router;
