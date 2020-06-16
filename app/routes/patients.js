var express=require('express');
var router=express.Router();
const patientsCtrl = require('../controllers/patients.controller.js');

router.post('/addPatient', patientsCtrl.savePatient);

router.post('/getPatients', patientsCtrl.getPatientsList);

router.post('/getPatients/:hid', patientsCtrl.getPatientDetails);

router.delete('/deletePatient/:hid', patientsCtrl.deletePatient);

router.put('/updatePatient/:hid', patientsCtrl.updatePatient);

module.exports=router;