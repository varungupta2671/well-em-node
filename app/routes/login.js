var express = require('express');
var router = express.Router();
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const PatientAuth = require('../models/login');
// const loginCtrl = require('../controllers/login.controller.js');

/* POST patient signin. */
// router.post('/patient/signin', loginCtrl.signInPatient);

router.post('/patient/signup',
  [
    check("hid", "Please Enter a Valid HealthCare Id")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      hid,
      email,
      aadharid,
      phone,
      password
    } = req.body;
    try {
      let user = await PatientAuth.findOne({
        hid
      });
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists"
        });
      }

      user = new PatientAuth({
        hid,
        email,
        aadharid,
        phone,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString", {
        expiresIn: 10000
      },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

module.exports = router;
