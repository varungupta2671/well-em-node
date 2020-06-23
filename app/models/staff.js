const db = require('../dbconnection');

/**
 * Staff Info
 * ----------
 * "sid" : "3426533",
 * "sname" : "Sam",
 * "stype": "d",
 * 
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
 * "country": "India",
**/

const staffSchema = db.Schema({
    sid: { type: String, required: true, unique: true },
    sname: String,
    stype: { type: String, required: true },
});

module.exports.StaffModel = db.model('staff_info_tbl', staffSchema);
