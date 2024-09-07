const express = require("express");
const router = express.Router();
const PatientDocumentController = require("../controllers/PatientDocumentController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.post(
  "/",
  auth,
  role(["Admin", "Doctor"]),
  PatientDocumentController.create
);
router.get(
  "/:patientId",
  auth,
  role(["Admin", "Doctor", "Nurse"]),
  PatientDocumentController.getByPatientId
);

module.exports = router;