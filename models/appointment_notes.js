const mongoose = require('mongoose');

const appointmentNotesSchema = new mongoose.Schema({
  appointment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointments', required: true },
  notes: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const AppointmentNotes = mongoose.model('appointment_notes', appointmentNotesSchema);
module.exports = AppointmentNotes;