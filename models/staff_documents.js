const mongoose = require('mongoose');

const staffDocumentsSchema = new mongoose.Schema({
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  document_type: { type: String, required: true },
  document_url: { type: String, required: true }, // Could be a file path or URL
  uploaded_at: { type: Date, default: Date.now },
});

const StaffDocuments = mongoose.model('staff_documents', staffDocumentsSchema);
module.exports = StaffDocuments;