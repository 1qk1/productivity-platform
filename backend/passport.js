const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  User = require("./models/user");

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password, user.password)) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    });
  })
);
