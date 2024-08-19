const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const app = express()

// Routes
router.get("/", usersController.getAllUsers);
router.get("/search", usersController.getUserById);
router.post("/", usersController.createUser);
router.post("/update", usersController.updateUser);
router.delete("/", usersController.deleteUser);

module.exports = router;
