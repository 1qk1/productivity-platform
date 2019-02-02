const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  User = require("./models/user"),
  CustomError = require("./middleware/error").CustomError;

passport.use(
  new LocalStrategy((username, password, done) => {
    // find the user
    User.findOne({ username })
      .then(user => {
        // if there isn't a user with the given username
        // or the password is wrong, throw a
        // new CustomError with the statuscode and the message;
        if (!user)
          throw new CustomError(401, "Incorrect username or password.");
        // if the user exists
        user
          // check if password is valid
          .validPassword(password, user.password)
          .then(passwordIsValid => {
            // if it's not throw an error
            if (!passwordIsValid) {
              throw new CustomError(401, "Incorrect username or password.");
            }
            const { username, _id, extensions } = user;
            const userData = {
              username,
              id: _id,
              extensions
            };
            // if the password was correct
            // continue and pass the user to done()
            return done(null, userData);
          })
          // pass the error to done() and continue
          .catch(error => done(error));
      })
      // pass the error to done() and continue
      .catch(error => done(error));
  })
);
