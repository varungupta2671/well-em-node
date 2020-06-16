var express = require('express');
var router = express.Router();
const loginCtrl = require('../controllers/login.controller.js');

/* POST patient signin. */
router.post('/patient', loginCtrl.signInPatient);

module.exports = router;
