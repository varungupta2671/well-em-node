const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator/check");

const AuthModel = require('../models/login');
const PatientModel = require('../models/patients');

exports.signupPatient = async (req, res) => {
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
        country,
        type
    } = req.body;
    
    try {
        let user = await AuthModel.findOne({
            hid
        });
        if (user) {
            return res.status(400).json({
                msg: "User Already Exists"
            });
        }

        user = new AuthModel({
            hid,
            email,
            aadharid,
            phone,
            password,
            type
        });

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
                    token
                });
            }
        );
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
        switch (type) {
            case "p":
                console.log("I am patient !");
                const user = await AuthModel.findById(req.user.id);
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