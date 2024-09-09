const EmergencyContact = require("../models/emergency");

// READ
exports.getAllEmergency = (callback) => {
    EmergencyContact.getAllAdmins((err, emergency_contacts) => {
    if (err) throw err;
    callback(emergency_contacts);
  });
};

exports.getEmergencyContactById = async (req, res) => {
  const id = req.params.id;

  EmergencyContact.getEmergencyContactById(id, (err, emergency_contacts) => {
    if (err) throw err;
    res.json(emergency_contacts);
  });
};

exports.getEmergencyContactById = (id, callback) => {
    EmergencyContact.getEmergencyContactById(id, (err, admins) => {
    if (err) throw err;
    callback(admins);
  });
};


//CREATE
exports.createEmergencyContact = async (req, res) => {
  const emergency_contact = {
    id: req.body.id,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone,
    address: req.body.address,
    relationship: req.body.relationship,
    gender: req.body.gender,
    patient_id: req.body.patient_id,
  };
  EmergencyContact.createEmergencyContact(emergency_contact, (err, emergency_contacts) => {
    if (err) throw err;
    res.json({ message: "Emergency created successfully" });
  });
};

// UPDATE
exports.updateAdmin = async (req, res) => {
  const id = req.body.id;
  const emergency_contact = {
    id: req.body.id,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone,
    address: req.body.address,
    relationship: req.body.relationship,
    gender: req.body.gender,
    patient_id: req.body.patient_id,
  };

  EmergencyContact.updateEmergencyContact(emergency_contact, id, (err, result) => {
    if (err) throw err;
    res.json({ message: "Emergency Contact updated successfully" });
  });
};

// DELETE
exports.deleteEmergencyContact = async (req, res) => {
  const id = req.body.id;
  EmergencyContact.deleteEmergencyContact(id, (err, result) => {
    if (err) throw err;
    res.json({ message: "Emergency Contact deleted successfully" });
  });
};
