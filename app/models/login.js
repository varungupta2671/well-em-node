const db = require('../dbconnection');
const bcrypt = require('bcryptjs');

/**
 * User
 * --------
 * "hid" : "2345454",
 * "aadharid" : "34234dff",
 * "email" : "sam@gmail.com",
 * "password" : "********",
 * "phone" : "9988845535"
**/

const patientAuthSchema = db.Schema({
    hid: { type: String, unique: true },
    aadharid: { type: String, unique: true },
    password: { type: String },
    phone: { type: String, unique: true }
});

var loginAuth = module.exports = db.model('patientAuth', patientAuthSchema);

/**
 * Common methods
 * --------------
 */
// hash the password when creating a new user in the database
function encodePassword(newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            // store hash
            newUser.password = hash;
            newUser.save(callback); // the callback of save is a function(err, user)
        });
    });
}

// compare the password when login
function comparePassword(candidatePassword, hash, callback) {
    console.log("In comparePassword !");
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) {
            throw err;
        }
        callback(null, isMatch);
    });
}

function getUserByHCareId (hid, callback) {
    console.log("In getUserByHCareId !");
	loginAuth.findOne({
		hid: hid
	}, callback);
}

function getUserById (id, callback) {
    console.log("In getUserById !");
	loginAuth.findById(id, callback);
}

module.exports.createPassword = encodePassword;
module.exports.comparePassword = comparePassword;
module.exports.getUserByHCareId = getUserByHCareId;
module.exports.getUserById = getUserById;
