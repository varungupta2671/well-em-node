const db = require('../dbconnection');

/**
 * Hospital Info
 * -------------
 * "hoid" : "3426533",
 * "hname" : "Max Hospital",
 * "departments": "[1,4,5,7]",
 * "email" : "est@gmail.com",
 * "contactNumber" : "9988845535",
 * "contactName": "XYZ Singh",
 * "haddress" : "332 Neeladhri, E-City",
 * "hstate" : "Karnataka",
 * "hcity" : "Bangalore",
 * "userType" : "a"
**/

const hospitalSchema = db.Schema({
    hoid: { type: String, required: true, unique: true },
    hname: String,
    departments: { type: Array, default: [] },
    email: String,
    contactNumber: String,
    contactName: String,
    haddress: String,
    hstate: String,
    hcity: String,
    userType: { type: String, required: true }
});

const departmentSchema = db.Schema({
    departmentname: String,
    departmentid: { type: String, unique: true },
    departmentdescription: String
});

const treatmentSummarySchema = db.Schema({
    uid: String,
    treatmentname: String,
    treatmentid: { type: String, unique: true },
    treatmentdescription: String,
    createdAt: { type: Date, default: Date.now() }
});

module.exports.HospitalModel = db.model('hospital_info_tbl', hospitalSchema);
module.exports.HospitalModel = db.model('departments_tbl', departmentSchema);
module.exports.HospitalModel = db.model('hospitalized_summary_tbl', treatmentSummarySchema);
