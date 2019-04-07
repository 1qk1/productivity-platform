const jwt = require("jsonwebtoken"),
  passport = require("passport"),
  { body } = require("express-validator/check");

const verifyToken = (req, res, next) => {
  // split the token from the Bearer
  const token = req.headers.authorization.split(" ")[1];
  // verify the token
  // if token will get verified, the jwt's content
  // will be req.user so the next function can use it
  // if jwt is invalid, it will throw an error
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      res.handleError(error);
    } else {
      req.user = { ...decoded };
      // continue
      next();
    }
  });
};

const verifyPassword = (req, res, next) => {
  // authenticate username and password
  passport.authenticate(
    "local",
    // function starts here
    (error, user, info) => {
      // if there is an error send an error response
      if (error) return res.handleError(error);
      // if there is no error
      // add the user to req.user
      req.user = { ...user };
      // continue with the next function
      next();
    },
    // function ends here
    { session: false }
  )(req, res, next);
  // passport.authenticate ends here
  // This indentantion is pretty confusing
  // but prettier doesn't do me the favor
};

const registerValidations = [
  body("email", "Please enter a valid e-mail address.").isEmail(),
  body("username", "Username should be more than 3 characters long.").isLength({
    min: 3
  }),
  body("password", "Password should be more than 5 characters long.").isLength({
    min: 5
  })
];

module.exports = {
  verifyToken,
  verifyPassword,
  registerValidations
};
