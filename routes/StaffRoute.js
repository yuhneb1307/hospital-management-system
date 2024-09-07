const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffsController.js");
router.use(express.static("public"));

// Routes
router.get("/", (req, res) => {
  staffController.getAllStaffs((staffs) => {
    res.render("staffs", { staffs });
  });
});

// READ
// router.get("/search", staffController.getStaffById);
router.get("/", staffController.getAllStaffs);
router.get("/:id", async (req, res) => {
  try {
    staffController.getStaffById(req.params.id, (staff) => {
      if (!staff || staff.length === 0) {
        return res.status(404).send("Staff not found");
      }
      res.render("doctor", {
        staff: staff[0],
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/doctors", staffController.getAllDoctors);
router.get("/nurse", staffController.getAllNurses);
router.get("/search/:id", staffController.getStaffById);
router.get("/sort/:data/:order", staffController.getStaffByDataOrder);
router.get("/search/allergy", staffController.getStaffById);

// CREATE
router.post("/", staffController.createStaff);
router.post("/login", staffController.checkLogIn);

//UPDATE
router.post("/update", staffController.updateStaff);
// DELETE
router.delete("/", staffController.deleteStaff);

module.exports = router;
