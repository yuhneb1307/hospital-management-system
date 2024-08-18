const mongoose = require('mongoose');

const patientsAllergiesSchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patients', required: true },
  allergy_name: { type: String, required: true },
  severity: { type: String }, // Example: 'Mild', 'Moderate', 'Severe'
  reaction: { type: String },
  recorded_at: { type: Date, default: Date.now },
});

const PatientsAllergies = mongoose.model('patients_allergies', patientsAllergiesSchema);
module.exports = PatientsAllergies;