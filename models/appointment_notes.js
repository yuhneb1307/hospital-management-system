const mongoose = require('mongoose');

const appointmentNotesSchema = new mongoose.Schema({
  appointment_id: { type: String, required: true }, // Changed to String based on your sample data
  patient_id: { type: String, required: true }, // Added patient_id as per your example
  created_at: { type: Date, default: Date.now }, // Retained the created_at field
  observations: { type: String }, // Added observations field
  prescriptions: [{ type: String }] // Added prescriptions as an array of strings
});

const AppointmentNotes = mongoose.model('appointment_notes', appointmentNotesSchema);
module.exports = AppointmentNotes;