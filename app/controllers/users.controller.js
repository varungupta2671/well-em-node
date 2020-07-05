const { PatientModel, AppointmentModel } = require('../models/patient');
const { StaffModel } = require('../models/staff');
const { HospitalModel } = require('../models/hospital');
const { LabModel, BookedLabTestModel, LabTestModel } = require('../models/lab');
const { PharmacyModel } = require('../models/pharmacy');
const { getUniqueId } = require("../controllers/common.controller.js");

exports.getUsersList = async (req, res) => {
    // console.log('request', req);
    let userDetails;
    const utype = req.params.utype;
    try {
        switch (utype) {
            case "p":
                // get patient list
                userDetails = await PatientModel.find();
                break;
            case "d":
                // get staff list
                userDetails = await StaffModel.find();
                break;
            case "h":
                // get hospital list
                userDetails = await HospitalModel.find();
                break;
            case "l":
                // get lab list
                userDetails = await LabModel.find();
                break;
            case "t":
                // get lab test list
                userDetails = await LabTestModel.find();
                break;
            case "ph":
                // get pharmacy list
                userDetails = await PharmacyModel.find();
                break;
            default:
                res.status(400).json({
                    msg: "Invalid user !"
                });
        }
        // console.log("user_", userDetails);
        res.status(200).json(userDetails);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving Patients."
        });
    }
};

exports.getUserDetails = (req, res) => {
    // console.log('request', req);
    const uid = req.params.uid;
    PatientModel.find({ hid: uid })
        .then(patient => {
            if (!patient) {
                return res.status(404).send({
                    message: "Patient not found with id " + uid
                });
            }
            res.send(patient[0]);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Patient not found with id " + uid
                });
            }
            return res.status(500).send({
                message: "Error retrieving patient with id " + uid
            });
        });
};

exports.getAppointmentsList = async (req, res) => {
    // console.log('request', req);
    let requestData;
    const utype = req.params.utype;
    const uid = req.params.uid;
    switch (utype) {
        case "p":
            // get patient appointment list
            requestData = { uid: uid };
            break;
        case "d":
            // get doctor appointment list
            requestData = { doctorid: uid };
            break;
        default:
            res.status(400).json({
                msg: "Invalid user !"
            });
    }

    AppointmentModel.find(requestData)
        .then(list => {
            res.send(list);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Appointment list not found with id " + uid
                });
            }
            return res.status(500).send({
                message: "Error retrieving appointment list with id " + uid
            });
        });
};

exports.BookAppointment = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Appointment content can not be empty"
        });
    }

    // Save an Appointment
    const appointmentData = new AppointmentModel({
        uid: req.body.uid,
        appointmentname: req.body.name,
        appointmentid: getUniqueId('ap'),
        doctorid: req.body.doctorid,
        appointmenttime: req.body.time,
        bookedBy: req.params.utype
    });

    // Save Appointment in the database
    appointmentData.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the appointment."
            });
        });
};

exports.getBookedTestList = async (req, res) => {
    // console.log('request', req);
    let requestData;
    const utype = req.params.utype;
    const uid = req.params.uid;
    switch (utype) {
        case "p":
            // get patient appointment list
            requestData = { uid: uid };
            break;
        case "l":
            // get patient appointment list
            requestData = { labid: uid };
            break;
        default:
            res.status(400).json({
                msg: "Invalid user !"
            });
    }

    BookedLabTestModel.find(requestData)
        .then(list => {
            res.send(list);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Lab test list not found with id " + uid
                });
            }
            return res.status(500).send({
                message: "Error retrieving lab test list with id " + uid
            });
        });
};

exports.BookLabTest = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Lab test content can not be empty"
        });
    }

    // Save a lab test booking
    const labTestData = new BookedLabTestModel({
        uid: req.body.uid,
        testid: req.body.testid,
        labid: req.body.labid,
        bookedBy: req.params.utype
    });

    // Save a lab test booking in the database
    labTestData.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while booking the lab test."
            });
        });
};

// exports.savePatientToHospital = (req, res) => {
//     // Validate request
//     if (!req.body) {
//         return res.status(400).send({
//             message: "Patient content can not be empty"
//         });
//     }

//     // Save a Patient
//     const category = new PatientModel({
//         hid: req.body.hid,
//         aadharid: req.body.aadharid,
//         name: req.body.name,
//         age: req.body.age,
//         bg: req.body.bg,
//         weight: req.body.weight,
//         height: req.body.height,
//         dob: req.body.dob,
//         sex: req.body.sex,
//         phone: req.body.phone,
//         email: req.body.email,
//         address: req.body.address,
//         city: req.body.city
//     });

//     // Save Patient in the database
//     category.save()
//         .then(data => {
//             res.send(data);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while creating the Patient."
//             });
//         });
// };

// exports.deletePatient = (req, res) => {
//     PatientModel.findOneAndRemove({ hid: req.params.hid })
//         .then(patient => {
//             if (!patient) {
//                 return res.status(404).send({
//                     message: "Patient not found with id " + req.params.hid
//                 });
//             }
//             res.send({ message: "Patient deleted successfully!" });
//         }).catch(err => {
//             if (err.kind === 'ObjectId' || err.name === 'NotFound') {
//                 return res.status(404).send({
//                     message: "Patient not found with id " + req.params.hid
//                 });
//             }
//             return res.status(500).send({
//                 message: "Could not delete patient with id " + req.params.hid
//             });
//         });
// };

// exports.updatePatient = (req, res) => {
//     if (!req.body) {
//         return res.status(400).send({
//             message: "Patient content can not be empty"
//         });
//     }
//     // Find patient and update it with the request body
//     PatientModel.findOneAndUpdate({ hid: req.params.hid }, {
//         aadharid: req.body.aadharid,
//         name: req.body.name,
//         age: req.body.age,
//         bg: req.body.bg,
//         weight: req.body.weight,
//         height: req.body.height,
//         dob: req.body.dob,
//         sex: req.body.sex,
//         phone: req.body.phone,
//         email: req.body.email,
//         address: req.body.address,
//         city: req.body.city
//     }, { new: true })
//         .then(patient => {
//             if (!patient) {
//                 return res.status(404).send({
//                     message: "Patient not found with id " + req.params.hid
//                 });
//             }
//             res.send(patient);
//         }).catch(err => {
//             if (err.kind === 'ObjectId') {
//                 return res.status(404).send({
//                     message: "Patient not found with id " + req.params.hid
//                 });
//             }
//             return res.status(500).send({
//                 message: "Error updating patient with id " + req.params.hid
//             });
//         });
// };

