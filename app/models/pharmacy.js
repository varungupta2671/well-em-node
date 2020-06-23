const db = require('../dbconnection');

/**
 * Pharmacy Info
 * -------------
 * "pid" : "3426533",
 * "pname" : "Indomax Chemist",
 * "email" : "est@gmail.com",
 * "contactNumber" : "9988845535",
 * "contactName": "XYZ Singh",
 * "paddress" : "332 Neeladhri, E-City",
 * "pstate" : "Karnataka",
 * "pcity" : "Bangalore"
**/

const pharmacySchema = db.Schema({
    pid: { type: String, required: true, unique: true },
    pname: String,
    email: String,
    contactNumber: String,
    contactName: String,
    paddress: String,
    pstate: String,
    pcity: String
});

module.exports.PharmacyModel = db.model('pharmacy_info_tbl', pharmacySchema);
