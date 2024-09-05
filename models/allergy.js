const mongoose = require("mongoose");

const patientsAllergiesSchema = new mongoose.Schema({
  _id: { type: Number },
  patient_id: { type: Number }, // Referring to Patients model
  allergy_name: { type: String, required: true },
  reaction: { type: String }, // Added this to match your sample data
  severity: { type: String }, // Example: 'Mild', 'Moderate', 'Severe'
  discovered_date: { type: Date }, // Changed from recorded_at to match the sample data
});

const PatientsAllergies = mongoose.model("allergy", patientsAllergiesSchema);
module.exports = PatientsAllergies;
