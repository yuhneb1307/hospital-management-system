const mongoose = require('mongoose');

const patientsAllergiesSchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patients', required: true }, // Referring to Patients model
  allergy_name: { type: String, required: true },
  reaction: { type: String }, // Added this to match your sample data
  severity: { type: String }, // Example: 'Mild', 'Moderate', 'Severe'
  discovered_date: { type: Date }, // Changed from recorded_at to match the sample data
  notes: { type: String } // Added this to match your sample data
});

const PatientsAllergies = mongoose.model('patients_allergies', patientsAllergiesSchema);
module.exports = PatientsAllergies;