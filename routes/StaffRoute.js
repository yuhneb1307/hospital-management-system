const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffsController.js");
router.use(express.static('public'));

// Routes
router.get("/", (req, res) => {
    staffController.getAllStaffs((patients) => {
        res.render('patients', {patients})
    })
});

// READ
// router.get("/search", staffController.getStaffById);
router.get("/", staffController.getAllStaffs);
router.get("/search/:data", staffController.getStaffById);
router.get("/sort/:data/:order", staffController.getStaffByDataOrder);
router.get("/search/allergy", staffController.getStaffById);

// CREATE
router.post("/", staffController.createStaff);

//UPDATE
router.post("/update", staffController.updateStaff);
// DELETE
router.delete("/", staffController.deleteStaff);

module.exports = router;