const express=require('express');
const router=express.Router();
const auth = require("./auth");
const patientsCtrl = require('../controllers/patients.controller.js');

router.post('/addPatient', auth, patientsCtrl.savePatient);

router.post('/getPatients', auth, patientsCtrl.getPatientsList);

router.post('/getPatients/:hid', auth, patientsCtrl.getPatientDetails);

router.delete('/deletePatient/:hid', auth, patientsCtrl.deletePatient);

router.put('/updatePatient/:hid', auth, patientsCtrl.updatePatient);

module.exports=router;