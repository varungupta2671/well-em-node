const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var PatientAuth = require('../models/login');

exports.signInPatient = (req, res) => {
    // // console.log('request', req);
    // passport.authenticate('local', {
    //     successRedirect: '/app',
    //     failureRedirect: '/',
    //     failureFlash: true
    // })
    //     .then(data => {
    //         res.send(data);
    //     }).catch(err => {
    //         res.status(500).send({
    //             message: err.message || "Some error occurred while signing in."
    //         });
    //     });

    console.log("request", req.body);
    console.log("-------------");
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/patient',
        failureFlash: true
    }), function (req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.redirect('/');
    }
};

// the Middleware for authetification -> provided by the passport library
passport.use(new LocalStrategy(
    function (hid, password, done) {
        console.log("hid", hid);
        console.log("password", password);
        console.log("-------------");
        console.log("In LocalStrategy !");
        PatientAuth.getUserByHCareId(hid, function (err, user) {
            if (err) {
                throw err;
            }
            if (!user) {
                //     done(error, found the user)
                return done(null, false, { message: "Unknown User" });
            }

            PatientAuth.comparePassword(password, user.password, function (err, isMatch) {
                if (err) {
                    throw err;
                }
                console.log("In PatientAuth.comparePassword !");
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, 'Invalid password');
                }
            });
        });
    }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});
