const mongoose = require('mongoose');

const doctorNotesSchema = new mongoose.Schema({
  patient_id: { type: String, required: true },
  observations: { type: String, required: true },
  diagnosis: { type: String, required: true },
  treatment_plan: { type: String, required: true },
  related_appointment_notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AppointmentNotes' }]
}, { timestamps: true });

module.exports = mongoose.model('doctor_notes', doctorNotesSchema);