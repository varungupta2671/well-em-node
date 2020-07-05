const express = require('express');
const router = express.Router();
const { token } = require("../controllers/common.controller.js");
const usersCtrl = require('../controllers/users.controller.js');

router.post('/getUsers/:utype', token, usersCtrl.getUsersList);

router.post('/getUserDetails/:utype/:uid', token, usersCtrl.getUserDetails);

router.post('/getAppointments/:utype/:uid', token, usersCtrl.getAppointmentsList);

router.post('/BookAppointment/:utype', token, usersCtrl.BookAppointment);

router.post('/getBookedTests/:utype/:uid', token, usersCtrl.getBookedTestList);

router.post('/BookLabTest/:utype', token, usersCtrl.BookLabTest);

// router.post('/addPatientToHospital/:uid/:hoid', token, usersCtrl.savePatientToHospital);

// router.put('/updatePatient/:hid', token, usersCtrl.updatePatient);

// router.delete('/deletePatient/:hid', token, usersCtrl.deletePatient);

module.exports = router;