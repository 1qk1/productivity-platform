const jwt = require("jsonwebtoken"),
  passport = require("passport"),
  CustomError = require("./error").CustomError,
  { body } = require("express-validator");

const verifyToken = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (authToken === undefined) {
    return res.handleError(new CustomError(401, "Unauthorized"));
  }
  // split the token from the Bearer
  const token = authToken.split(" ")[1];
  // verify the token
  // if token will get verified, the jwt's content
  // will be req.user so the next function can use it
  // if jwt is invalid, it will throw an error
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      res.handleError(
        new CustomError(
          401,
          "There was a problem with your authorization token, please log in again."
        )
      );
      return res.json({ error });
    } else {
      req.user = { ...decoded };
      // continue
      next();
    }
  });
};

const verifyPassword = (req, res, next) => {
  // get the result of the passport strategy
  passport.authenticate("local", { session: false }, (error, user, info) => {
    // if there is an error or there is no user
    if (error || !user) {
      res.handleError(new CustomError(400, "Incorrect username or password."));
    }
    const { username, _id, extensions } = user;
    const userData = {
      username,
      id: _id,
      extensions
    };
    // pass the user in req.user
    req.user = userData;
    // continue
    next();
    // use an immediately executed function to pass the req and res into the callback
  })(req, res, next);
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
