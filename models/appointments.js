const mongoose = require("mongoose");

const appointmentNotesSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true }, // Changed to String based on your sample data
    patient_id: { type: Number }, // Added patient_id as per your example
    department_id: { type: Number }, // Added patient_id as per your example
    staff_id: { type: Number }, // Added patient_id as per your example
    status: { type: String }, // Added observations field
    date_of_appointment: { type: String }, // Added prescriptions as an array of strings
    observation: { type: String }, // Added observations field
    doctor_note: { type: String }, // Added observations field
  },
  {
    collection: "appointments", // the collection to use for this schema
  }
);

const Appointments = mongoose.model(
  "appointments",
  appointmentNotesSchema
);
module.exports = Appointments;
