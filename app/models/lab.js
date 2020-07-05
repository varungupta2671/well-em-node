const db = require('../dbconnection');

/**
 * Lab Info
 * --------
 * "lid" : "3426533",
 * "lname" : "Indomax Chemist",
 * "email" : "est@gmail.com",
 * "contactNumber" : "9988845535",
 * "contactName": "XYZ Singh",
 * "laddress" : "332 Neeladhri, E-City",
 * "lstate" : "Karnataka",
 * "lcity" : "Bangalore"
**/

const labSchema = db.Schema({
    lid: { type: String, required: true, unique: true },
    lname: String,
    email: String,
    contactNumber: String,
    contactName: String,
    laddress: String,
    lstate: String,
    lcity: String,
    ltests: { type: Array, default: [] },
});

const bookedLabTestSchema = db.Schema({
    testid: String,
    uid: String,
    labid: String,
    bookedBy: String,
    createdAt: { type: Date, default: Date.now() }
});

const labTestSchema = db.Schema({
    testname: String,
    testid: { type: String, unique: true }
});

module.exports.LabModel = db.model('lab_info_tbl', labSchema);
module.exports.BookedLabTestModel = db.model('booked_lab_tests_tbl', bookedLabTestSchema);
module.exports.LabTestModel = db.model('lab_tests_tbl', labTestSchema);
