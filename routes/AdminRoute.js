const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminsController.js");
router.use(express.static("public"));
const patients = require("../models/patients.js"); // Import the model

// Routes
router.get("/", (req, res) => {
  adminController.getAllAdmins((admins) => {
    res.render("admins", { admins });
  });
});

// READ
// router.get("/search", adminController.getAdminById);
router.get("/", adminController.getAllAdmins);
router.get("/:id", async (req, res) => {
  try {
    adminController.getAdminById(req.params.id, (admin) => {
      if (!admin || admin.length === 0) {
        return res.status(404).send("Admin not found");
      }
      patients.getPatientByDoctorIDOrder(req.params.id, "doctor_id", "asc", (err, patients) => {
        res.render("doctor", {
          admin: admin[0],
          patients: patients,
        });
      })
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/search/:id", adminController.getAdminById);
router.get("/sort/:data/:order", adminController.getAdminByDataOrder);
router.get("/search/allergy", adminController.getAdminById);

// CREATE
router.post("/", adminController.createAdmin);
router.post("/login", adminController.checkLogIn);

//UPDATE
router.post("/update", adminController.updateAdmin);
// DELETE
router.delete("/", adminController.deleteAdmin);

module.exports = router;
