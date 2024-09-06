const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patientsController.js");
router.use(express.static('public'));

// Routes
router.get("/", (req, res) => {
    patientsController.getAllPatients((patients) => {
        res.render('patien-infor', {patients})
    })
});
router.get("/search", patientsController.getPatientById);
router.post("/", patientsController.createPatient);
router.post("/update", patientsController.updatePatient);
router.delete("/", patientsController.deletePatient);

module.exports = router;
