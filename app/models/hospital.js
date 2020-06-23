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

module.exports.HospitalModel = db.model('hospital_info_tbl', hospitalSchema);
