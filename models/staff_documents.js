const mongoose = require('mongoose');

const staffDocumentsSchema = new mongoose.Schema({
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true }, // Referring to the Staff model
  document_type: { type: String, required: true },
  document_name: { type: String, required: true }, // Added this to match your sample data
  issued_date: { type: Date }, // Added this to match your sample data
  document_file: { type: String, required: true }, // Changed from document_url to document_file for storing base64 encoded data
  uploaded_at: { type: Date, default: Date.now }
});

const StaffDocuments = mongoose.model('staff_documents', staffDocumentsSchema);
module.exports = StaffDocuments;