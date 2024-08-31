const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patientsController.js");
router.use(express.static('public'));
const appointment_notes = require('../models/appointment_notes'); // Import the model


// Routes
router.get("/", (req, res) => {
    patientsController.getAllPatients((patients) => {
        res.render('patients', {patients})
    })
});

// READ
router.get("/search", patientsController.getPatientById);
router.get("/:id", async (req, res) => {
    var appointment_object = await appointment_notes.find({ patient_id: req.params.id }).exec();
    console.log(appointment_object)
    patientsController.getPatientById(req.params.id,(patient) => {
        console.log(patient)
        res.render('patient-infor', {patient:patient[0], appointment_notes:appointment_object})
    })
});
router.get("/", patientsController.getAllPatients);
router.get("/search/:data", patientsController.getPatientById);
router.get("/sort/:data/:order", patientsController.getPatientByDataOrder);
router.get("/search/allergy", patientsController.getPatientById);

// CREATE
router.post("/", patientsController.createPatient);

//UPDATE
router.post("/update", patientsController.updatePatient);
// DELETE
router.delete("/", patientsController.deletePatient);

module.exports = router;
