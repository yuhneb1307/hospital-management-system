const express = require("express");
const router = express.Router();
const departmentsController = require("../controllers/departmentsController.js");
router.use(express.static('public'));

// Routes
router.get("/", (req, res) => {
    departmentsController.getAllDepartments((departments) => {
        res.render('departments', {departments})
    })
});

// READ
router.get("/search", departmentsController.getDepartmentById);
router.get("/", departmentsController.getAllDepartments);

module.exports = router;
