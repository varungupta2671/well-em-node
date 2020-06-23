const { PatientModel } = require('../models/patient');

exports.savePatient = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Patient content can not be empty"
        });
    }

    // Save a Patient
    const category = new PatientModel({
        hid: req.body.hid,
        aadharid: req.body.aadharid,
        name: req.body.name,
        age: req.body.age,
        bg: req.body.bg,
        weight: req.body.weight,
        height: req.body.height,
        dob: req.body.dob,
        sex: req.body.sex,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city
    });

    // Save Patient in the database
    category.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Patient."
            });
        });
};

exports.getPatientsList = (req, res) => {
    // console.log('request', req);
    PatientModel.find()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Patients."
            });
        });
};

exports.getPatientDetails = (req, res) => {
    // console.log('request', req);
    PatientModel.find({hid: req.params.hid})
        .then(patient => {
            if (!patient) {
                return res.status(404).send({
                    message: "Patient not found with id " + req.params.hid
                });
            }
            res.send(patient[0]);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Patient not found with id " + req.params.hid
                });
            }
            return res.status(500).send({
                message: "Error retrieving patient with id " + req.params.hid
            });
        });
};

exports.deletePatient = (req, res) => {
    PatientModel.findOneAndRemove({hid: req.params.hid})
        .then(patient => {
            if (!patient) {
                return res.status(404).send({
                    message: "Patient not found with id " + req.params.hid
                });
            }
            res.send({ message: "Patient deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Patient not found with id " + req.params.hid
                });
            }
            return res.status(500).send({
                message: "Could not delete patient with id " + req.params.hid
            });
        });
};

exports.updatePatient = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Patient content can not be empty"
        });
    }
    // Find patient and update it with the request body
    PatientModel.findOneAndUpdate({hid: req.params.hid}, {
        aadharid: req.body.aadharid,
        name: req.body.name,
        age: req.body.age,
        bg: req.body.bg,
        weight: req.body.weight,
        height: req.body.height,
        dob: req.body.dob,
        sex: req.body.sex,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city
    }, { new: true })
        .then(patient => {
            if (!patient) {
                return res.status(404).send({
                    message: "Patient not found with id " + req.params.hid
                });
            }
            res.send(patient);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Patient not found with id " + req.params.hid
                });
            }
            return res.status(500).send({
                message: "Error updating patient with id " + req.params.hid
            });
        });
};