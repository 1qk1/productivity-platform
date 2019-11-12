const LocalStrategy = require("passport-local").Strategy,
  User = require("./models/user");

module.exports = new LocalStrategy((username, password, done) => {
  User.findOne({ username })
    .then(user => {
      if (!user) {
        return done(null, false);
      }
      user.validPassword(password, user.password).then(isValid => {
        if (isValid) {
          done(null, user);
        } else {
          return done(null, false);
        }
      });

      return done(null, user);
    })
    .catch(done);
});
