const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * Common methods
 * --------------
 */

function generateToken(req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "You are not authorised to do this action." });

  try {
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Your session has been expired." });
  }
}

// generate unique ID when creating a new user in the database
function generateUniqueId(userType) {
  const date = new Date();
  const components = [
    date.getYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  ];
  let _ID;

  switch (userType) {
    case "p":
      _ID = "P" + components.join("");
      break;
    case "d":
      _ID = "D" + components.join("");
      break;
    case "h":
      _ID = "H" + components.join("");
      break;
    case "l":
      _ID = "L" + components.join("");
      break;
    case "ph":
      _ID = "PH" + components.join("");
      break;
    case "ap":
      _ID = "AP" + components.join("");
      break;
    default:
      console.log("Invalid user type !!");
      res.json({});
  }
  return _ID;
}

// hash the password when creating a new user in the database
function encodePassword(password, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // store hash
      callback(hash);
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

module.exports.token = generateToken;
module.exports.getUniqueId = generateUniqueId;
module.exports.encodePassword = encodePassword;
module.exports.comparePassword = comparePassword;
