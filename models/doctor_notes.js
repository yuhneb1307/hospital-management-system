const mongoose = require('mongoose');

const doctorNotesSchema = new mongoose.Schema({
  patient_id: { type: String, required: true }, // Kept as String to match your sample data
  observations: { type: String, required: true }, // Kept as required
  diagnosis: { type: String, required: true }, // Kept as required
  treatment_plan: { type: String, required: true }, // Kept as required
  related_appointment_notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AppointmentNotes' }], // Array of ObjectIds referencing AppointmentNotes
}, { timestamps: true }); // Auto-manage createdAt and updatedAt fields

module.exports = mongoose.model('doctor_notes', doctorNotesSchema);