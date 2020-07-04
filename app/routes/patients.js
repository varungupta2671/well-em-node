const express = require('express');
const router = express.Router();
const { token } = require("../controllers/common.controller.js");
const patientsCtrl = require('../controllers/patients.controller.js');

// router.post('/addPatient', token, patientsCtrl.savePatient);

router.post('/getPatients', token, patientsCtrl.getPatientsList);

router.post('/getPatients/:hid', token, patientsCtrl.getPatientDetails);

// router.delete('/deletePatient/:hid', token, patientsCtrl.deletePatient);

// router.put('/updatePatient/:hid', token, patientsCtrl.updatePatient);

module.exports = router;