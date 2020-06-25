const db = require('../dbconnection');

/**
 * Patient Info
 * ------------
 * "name" : "Sam",
 * "age" : 27,
 * "bg" : "AB+",
 * "weight" : 67,
 * "height" : 180,
 * "hid" : "2345454",
 * "aadharid" : "34234dff",
 * "dob" : "01/02/1993",
 * "sex" : "m",
 * "phone" : "9988845535",
 * "email" : "est@gmail.com",
 * "address" : "332 Neeladhri, E-City",
 * "city" : "Bangalore",
 * "country": "India"
**/

const patientsSchema = db.Schema({
    hid: { type: String, required: true, unique: true },
    aadharid: { type: String, sparse: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    bg: { type: String, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    dob: { type: Date, required: true },
    sex: { type: String, required: true },
    phone: { type: String, required: true, sparse: true},
    email: { type: String, required: true, sparse: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true }
});

const appointmentSummarySchema = db.Schema({
    uid: String,
    appointmentname: String,
    appointmentid: { type: String, unique: true },
    doctorid: { type: String, required: true },
    appointmenttime: { type: Date },
    createdAt: { type: Date, default: Date.now() }
});

module.exports.PatientModel = db.model('patient_info_tbl', patientsSchema);
module.exports.HospitalModel = db.model('hospitalized_summary_tbl', appointmentSummarySchema);