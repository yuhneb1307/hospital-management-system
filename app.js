// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
// const usersRoutes = require('./routes/UsersRoutes');
const patientsRoutes = require("./routes/PatientsRoutes");
const staffsRoutes = require("./routes/StaffRoute");
const adminsRoutes = require("./routes/AdminRoute");
const errorMiddleware = require("./middleware/errorMiddleware");

// MongoDB import Routes
const appointmentsRoutes = require("./routes/appointments");
const staffDocumentsRoutes = require("./routes/staffDocuments");
const patientsAllergiesRoutes = require("./routes/patientsAllergies");

// Create an Express application
const app = express();
app.use(express.json());
app.set("views", "./views");
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }))

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(morgan("dev")); // Log HTTP requests to the console
app.use(bodyParser.json()); // Parse JSON request bodies
// app.use('/users', usersRoutes);
app.use("/patients", patientsRoutes);
app.use("/staffs", staffsRoutes);
app.use("/admins", adminsRoutes);

// MongoDB
app.use("/appointments", appointmentsRoutes);
app.use("/staff-documents", staffDocumentsRoutes);
app.use("/patients-allergies", patientsAllergiesRoutes);

app.use(errorMiddleware);

// Import your database connections from the config folder
const mysqlConnection = require("./config/db"); // MySQL connection
const mongoose = require("mongoose");
const mongoConfig = require("./config/mongodb"); // MongoDB connection


// Debugging: Check if MySQL is connected
mysqlConnection.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err.stack);
    return;
  }
  console.log("MySQL connected as id " + mysqlConnection.threadId);

  // Place route definitions here after MySQL connection is established

  // Default route require login
  app.get("/", function (req, res) {
    console.log(mongoConfig);
    res.render("login");
  });
  app.get('/registerPatient', function (req, res) {
    res.render('registerPatient');
  });

  // Register route
  app.get("/register", function (req, res) {
    res.render("register");
  });

  app.get("/patient", function (req, res) {
    res.render("patient-infor");
  });

  // Register route
  app.get("/doctor", function (req, res) {
    res.render("doctor");
  });

  // Handle 404 errors
  app.use((req, res, next) => {
    res.status(404).json({ message: "Resource not found" });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
  });

  // Start the server after routes are defined
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// mongoConfig.connection((err) => {
//   console.error(err);
// })

// Debugging: Check if MongoDB is connected
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully.");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
