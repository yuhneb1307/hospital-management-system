const mongoose = require('mongoose');

const treatmentHistorySchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patients', required: true }, // Referring to the Patients model
  treatment_date: { type: Date, required: true },
  treatment_name: { type: String, required: true },
  description: { type: String },
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }, // Changed from doctor_id to staff_id to match your sample data
  outcome: { type: String },
  notes: { type: String } // Notes related to the treatment outcome or next steps
});

const TreatmentHistory = mongoose.model('treatment_history', treatmentHistorySchema);
module.exports = TreatmentHistory;