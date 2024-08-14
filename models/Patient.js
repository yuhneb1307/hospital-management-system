const mongoose = require("mongoose");
const PatientSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }, // e.g., admin, doctor, nurse, patient
  id: { type: Number, required: true },
});
module.exports = mongoose.model("Patient", PatientSchema);