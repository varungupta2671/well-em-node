var express=require('express');
var router=express.Router();
const patientsCtrl = require('../controllers/patients.controller.js');

router.post('/', patientsCtrl.savePatient);

router.get('/', patientsCtrl.getPatientsList);

router.get('/:hid', patientsCtrl.getPatientDetails);

router.delete('/:hid', patientsCtrl.deletePatient);

router.put('/:hid', patientsCtrl.updatePatient);

module.exports=router;