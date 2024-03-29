const express = require('express');
const router = express.Router();
const { check } = require("express-validator/check");
const { token } = require("../controllers/common.controller.js");
const authCtrl = require('../controllers/auth.controller.js');

/**
 * @method - POST
 * @description - Patient Signup
 * @param - /auth/patient/signup
 */
router.post('/signup/:usertype',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password, password should be of minimum 6 characters.').isLength({
      min: 6
    })
  ], authCtrl.signUp);

/**
 * @method - POST
 * @description - Patient Signin
 * @param - /auth/patient/signin
 */
router.post('/signin/:usertype',
  [
    check('password', 'Please enter a valid password').isLength({
      min: 6
    })
  ], authCtrl.signIn);

/**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /auth/check
 */
router.post('/check/:usertype', token, authCtrl.checkAuth);

module.exports = router;
