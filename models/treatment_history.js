const mongoose = require('mongoose');

const treatmentHistorySchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patients', required: true },
  treatment_date: { type: Date, required: true },
  treatment_name: { type: String, required: true },
  description: {type: String},
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
  outcome: {type: String},
  notes: {type:String} // Doctor responsible for the treatment
});

const TreatmentHistory = mongoose.model('treatment_history', treatmentHistorySchema);
module.exports = TreatmentHistory;