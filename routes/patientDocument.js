const express = require('express');
const router = express.Router();
const PatientDocumentController = require('../controllers/PatientDocumentController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/', auth, role(['admin', 'doctor']), PatientDocumentController.create);
router.get('/:patientId', auth, role(['admin', 'doctor', 'nurse']), PatientDocumentController.getByPatientId);

module.exports = router;