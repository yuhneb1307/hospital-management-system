const express = require("express");
const router = express.Router();
const PatientController = require("../controllers/PatientController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.post("/", auth, role(["Admin", "Doctor"]), PatientController.create);
router.get(
  "/",
  auth,
  role(["Admin", "Doctor", "Nurse"]),
  PatientController.getAll
);
router.get(
  "/:id",
  auth,
  role(["Admin", "Doctor", "Nurse"]),
  PatientController.getById
);
router.put("/:id", auth, role(["Admin", "Doctor"]), PatientController.update);
router.delete("/:id", auth, role(["Admin"]), PatientController.delete);

module.exports = router;
