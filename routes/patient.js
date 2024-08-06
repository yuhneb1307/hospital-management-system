const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/PatientController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/', auth, role(['admin', 'doctor']), PatientController.create);
router.get('/', auth, role(['admin', 'doctor', 'nurse']), PatientController.getAll);
router.get('/:id', auth, role(['admin', 'doctor', 'nurse']), PatientController.getById);
router.put('/:id', auth, role(['admin', 'doctor']), PatientController.update);
router.delete('/:id', auth, role(['admin']), PatientController.delete);

module.exports = router;