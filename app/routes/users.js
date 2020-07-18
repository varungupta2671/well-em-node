const express = require('express');
const router = express.Router();
const { token } = require("../controllers/common.controller.js");
const usersCtrl = require('../controllers/users.controller.js');

router.post('/getUsers/:utype/:stype', token, usersCtrl.getUsersList);

router.post('/getUserDetails/:utype/:uid', token, usersCtrl.getUserDetails);

router.post('/getAppointments/:utype/:uid', token, usersCtrl.getAppointmentsList);

router.post('/bookAppointment/:utype', token, usersCtrl.bookAppointment);

router.post('/getBookedTests/:utype/:uid', token, usersCtrl.getBookedTestList);

router.post('/bookLabTest/:utype', token, usersCtrl.bookLabTest);

router.post('/bookTreatment/:hoid', token, usersCtrl.bookTreatment);

router.post('/getTreatments/:hoid/:uid', token, usersCtrl.getTreatmentsList);

router.post('/bookEmergencyWard/:hoid', token, usersCtrl.bookEmergencyWard);

router.post('/getEmergencyWardBookings/:hoid/:uid', token, usersCtrl.getEmergencyWardBookings);

// router.put('/updatePatient/:hid', token, usersCtrl.updatePatient);

// router.delete('/deletePatient/:hid', token, usersCtrl.deletePatient);

module.exports = router;