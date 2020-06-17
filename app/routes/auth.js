const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = function(req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};

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
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) {
            throw err;
        }
        callback(null, isMatch);
    });
}

module.exports.encodePassword = encodePassword;
module.exports.comparePassword = comparePassword;