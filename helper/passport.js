var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var Users = require("../app/model/user.model")

passport.use(new LocalStrategy({
  usernameField: 'email'
},

  function (username, password, done) {

    Users.findOne({ email: username, userType: { $ne: "sysadmin" } }, function (err, user) {
      if (err) { return done(err) }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        })
      }

      const validator = user.validPassword(password, user)
      // Return if password is wrong
      if (validator == false) {
        return done(null, false, {
          message: 'Password is wrong'
        })
      }

    
      if (validator == -1) {
        return done(null, user, { message: "WrongMethod" })
      }

      // If credentials are correct, return the user object
      return done(null, user)
    }).collation(
      { locale: 'en', strength: 2 }
    );
  }
))

passport.use('sysadmin', new LocalStrategy({
  usernameField: 'email'
},

  function (username, password, done) {

    Users.findOne({ email: { '$regex': new RegExp(escapeRegExp(username)), '$options': 'i' }, userType: "sysadmin" }, function (err, user) {

      if (err) { return done(err) }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        })
      }
      if (user.status != "Active") {
        if (user.status == 'Pending') {
          return done(null, user, {
            message: 'Pending'
          })
        }
        else {
          return done(null, { userType: user.userType }, {
            message: 'User is not Active'
          })
        }
      }
      const validator = user.validPassword(password, user)
      // Return if password is wrong
      if (validator == false) {
        return done(null, false, {
          message: 'Password is wrong'
        })
      }
      if (validator == -1) {
        return done(null, false, { message: "WrongMethod" })
      }
      // If credentials are correct, return the user object
      return done(null, user)

    }).collation(
      { locale: 'en', strength: 2 }
    ); //end of user find
  }
))

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
