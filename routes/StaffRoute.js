const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffsController.js");
router.use(express.static('public'));

// Routes
router.get("/", (req, res) => {
    patientsController.getAllPatients((patients) => {
        res.render('patients', {patients})
    })
});

// READ
// router.get("/search", patientsController.getPatientById);
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