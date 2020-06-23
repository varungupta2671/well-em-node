const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator/check");
const { getUniqueId } = require("../controllers/common.controller.js");

const { AuthModel } = require('../models/auth');
const { PatientModel } = require('../models/patient');

exports.signupPatient = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        email,
        aadharid,
        phone,
        password,
        name,
        age,
        bg,
        weight,
        height,
        dob,
        sex,
        address,
        city,
        country
    } = req.body;
    const utype = req.params.usertype;
    const hid = getUniqueId(utype);

    let user = await AuthModel.findOne({
        id: hid
    });

    if (user) {
        return res.status(400).json({
            msg: "User Already Exists"
        });
    }

    try {

        user = new AuthModel({
            _id: hid,
            email: email,
            aadharid: aadharid,
            phone: phone,
            password: password,
            utype: utype
        });

        switch (utype) {
            case "p":
                // Register code here for Patient

                let userDetails = new PatientModel({
                    hid,
                    email,
                    aadharid,
                    phone,
                    name,
                    age,
                    bg,
                    weight,
                    height,
                    dob,
                    sex,
                    address,
                    city,
                    country
                });

                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
                // console.log("USER_ => ", user);

                await user.save();
                await userDetails.save();

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
                            'token': token, 'uid': hid
                        });
                    }
                );

                break;
            case "d":
                // Register code here for Staff
                break;
            case "h":
                // Register code here for Hospital
                break;
            case "l":
                // Register code here for Lab
                break;
            default:
                console.log("Invalid user type !!");
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving | " + err.message);
    }
};

exports.signinPatient = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { hid, password } = req.body;
    try {
        let user = await AuthModel.findOne({
            hid
        });
        if (!user)
            return res.status(400).json({
                message: "User Not Exist"
            });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                message: "Incorrect Password !"
            });

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "randomString",
            {
                expiresIn: 3600
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token
                });
            }
        );
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

exports.checkAuth = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { type } = req.body;
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await AuthModel.findById(req.user.id);
        switch (type) {
            case "p":
                console.log("I am patient !");
                const userDetails = await PatientModel.findOne({ hid: user.hid });
                res.json(userDetails);
                break;
            case "d":
                console.log("I am doctor !");
                res.json({});
                break;
            case "h":
                console.log("I am hospital !");
                res.json({});
                break;
            case "l":
                console.log("I am lab !");
                res.json({});
                break;
            default:
                console.log("Invalid user type !!");
                res.json({});
        }

    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server Error"
        });
    }
};