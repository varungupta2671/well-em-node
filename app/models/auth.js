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
    _id: { type: String, unique: true },
    aadharid: { type: String, sparse: true },
    password: String,
    phone: { type: String, sparse: true },
    utype: String,
    createdAt: { type: Date, default: Date.now() }
});

module.exports.AuthModel = db.model('superauth_tbl', authSchema);