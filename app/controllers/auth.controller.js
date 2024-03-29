const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator/check");
const { getUniqueId, encodePassword } = require("../controllers/common.controller.js");

const { AuthModel } = require('../models/auth');
const { PatientModel } = require('../models/patient');
const { StaffModel } = require('../models/staff');
const { HospitalModel } = require('../models/hospital');
const { LabModel } = require('../models/lab');
const { PharmacyModel } = require('../models/pharmacy');

exports.signUp = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    let user;
    let userDetails;
    const
        email = req.body.email || '',
        aadharid = req.body.aadharid || '',
        phone = req.body.phone || '',
        password = req.body.password,
        name = req.body.name || '',
        age = req.body.age || '',
        bg = req.body.bg || '',
        weight = req.body.weight || '',
        height = req.body.height || '',
        dob = req.body.dob || '',
        sex = req.body.sex || '',
        address = req.body.address || '',
        city = req.body.city || '',
        state = req.body.state || '',
        country = req.body.country || '',
        stype = req.body.stype || 'd',
        utype = req.params.usertype || '',
        qualification = req.body.qualification || '',
        regNo = req.body.regNo || '',
        regState = req.body.regState || '',
        yearOfReg = req.body.yearOfReg || '',
        contactName = req.body.contactName || '',
        speciality = req.body.speciality || [],
        departments = req.body.departments || [],
        ltests = req.body.ltests || [],
        uid = getUniqueId(utype);

    user = await AuthModel.findOne({
        id: uid
    });

    if (user) {
        return res.status(400).json({
            msg: "User Already Exists"
        });
    }

    try {

        encodePassword(password, async (hashPass) => {
            user = new AuthModel({
                _id: uid,
                email: email,
                password: hashPass,
                aadharid: aadharid,
                phone: phone,
                utype: utype
            });

            const payload = {
                user: {
                    id: user.id
                }
            };

            switch (utype) {
                case "p":
                    // Register code here for Patient
                    userDetails = new PatientModel({
                        hid: uid,
                        email: email,
                        aadharid: aadharid,
                        phone: phone,
                        name: name,
                        age: age,
                        bg: bg,
                        weight: weight,
                        height: height,
                        dob: dob,
                        sex: sex,
                        address: address,
                        city: city,
                        country: country
                    });

                    break;
                case "d":
                    // Register code here for Staff
                    userDetails = new StaffModel({
                        sid: uid,
                        sname: name,
                        speciality: speciality,
                        stype: stype,
                        email: email,
                        dob: dob,
                        sex: sex,
                        phone: phone,
                        aadharid: aadharid,
                        qualification: qualification,
                        regNo: regNo,
                        regState: regState,
                        yearOfReg: yearOfReg
                    });

                    break;
                case "h":
                    // Register code here for Hospital
                    userDetails = new HospitalModel({
                        hoid: uid,
                        hname: name,
                        departments: departments,
                        email: email,
                        contactNumber: phone,
                        contactName: contactName,
                        haddress: address,
                        hstate: state,
                        hcity: city,
                        userType: stype
                    });

                    break;
                case "l":
                    // Register code here for Lab
                    userDetails = new LabModel({
                        lid: uid,
                        lname: name,
                        email: email,
                        contactNumber: phone,
                        contactName: contactName,
                        laddress: address,
                        lstate: state,
                        lcity: city,
                        ltests: ltests
                    });

                    break;
                case "ph":
                    // Register code here for Pharmacy
                    userDetails = new PharmacyModel({
                        pid: uid,
                        pname: name,
                        email: email,
                        contactNumber: phone,
                        contactName: contactName,
                        paddress: address,
                        pstate: state,
                        pcity: city
                    });

                    break;
                default:
                    console.log("Invalid user type !!");
                    return res.status(400).json({
                        msg: "You have registered as invalid user !"
                    });
            }

            await user.save();
            await userDetails.save();

            jwt.sign(
                payload,
                "randomString", {
                expiresIn: 10000
            },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        'token': token, 'uid': uid
                    });
                }
            );
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving | " + err.message);
    }
};

exports.signIn = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { uid, password } = req.body;
    const utype = req.params.usertype;
    try {
        let user = await AuthModel.findOne({
            _id: uid, utype: utype
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
                expiresIn: 10000
            },
            (err, token) => {
                if (err) throw err;
                res.set({
                    'auth-token': token
                });
                res.status(200).json({
                    message: "You are successfully logged into the application!"
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

    let userDetails;
    const type = req.params.usertype;
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await AuthModel.findById(req.user.id);
        switch (type) {
            case "p":
                userDetails = await PatientModel.findOne({ hid: user.id });
                break;
            case "d":
                userDetails = await StaffModel.findOne({ sid: user.id });
                break;
            case "h":
                userDetails = await HospitalModel.findOne({ hoid: user.id });
                break;
            case "l":
                userDetails = await LabModel.findOne({ lid: user.id });
                break;
            case "ph":
                userDetails = await PharmacyModel.findOne({ pid: user.id });
                break;
            default:
                return res.status(400).json({
                    msg: "Invalid user !"
                });
        }

        // console.log("user_", userDetails);
        res.json(userDetails);

    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server Error"
        });
    }
};