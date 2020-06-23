const db = require('../dbconnection');

/**
 * Staff Info
 * ----------
 * "sid" : "3426533",
 * "sname" : "Sam",
 * "stype": "d",
 * "email" : "est@gmail.com",
 * "dob" : "01/02/1993",
 * "sex" : "m",
 * "phone" : "9988845535",
 * "aadharid" : "34234dff",
 * "qualification": "MD",
 * "regNo" : "Lt48304385",
 * "regState" : "Punjab",
 * "yearOfReg": 2012,
**/

const staffSchema = db.Schema({
    sid: { type: String, required: true, unique: true },
    sname: String,
    speciality: Number,
    stype: { type: String, required: true },
    email: String,
    dob: { type: Date, required: true },
    sex: { type: String, required: true },
    phone: { type: String, required: true },
    aadharid: { type: String, sparse: true },
    qualification: { type: String, required: true },
    regNo: { type: String, sparse: true },
    regState: String,
    yearOfReg: Number
});

module.exports.StaffModel = db.model('staff_info_tbl', staffSchema);
