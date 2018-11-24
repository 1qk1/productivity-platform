const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  User = require("./models/user");

passport.use(
  new LocalStrategy((username, password, done) => {
    // find the user
    User.findOne({ username }, function(err, user) {
      // if there is an error, pass it to done()
      if (err) {
        return done(err);
      }
      // if there isn't a user with that username or
      // the password is wrong
      // pass it to done() and continue
      if (!user || !user.validPassword(password, user.password)) {
        return done(null, false, {
          message: "Incorrect username or password."
        });
      }

      // if the password is correct
      // continue and pass the user to done()
      return done(null, user);
    });
  })
);
