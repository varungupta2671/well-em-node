const db = require('../dbconnection');

/**
 * User Auth
 * ---------
 * "hid" : "2345454",
 * "aadharid" : "34234dff",
 * "email" : "sam@gmail.com",
 * "password" : "********",
 * "phone" : "9988845535"
**/

const authSchema = db.Schema({
    hid: { type: String, unique: true },
    aadharid: { type: String, unique: true },
    password: { type: String },
    phone: { type: String, unique: true },
    type: { type: String },
    createdAt: { type: Date, default: Date.now() }
});

module.exports.AuthModel = db.model('superauth_tbl', authSchema);