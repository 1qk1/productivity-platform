const jwt = require("jsonwebtoken"),
  base64 = require("js-base64").Base64,
  passport = require("passport");

const verifyToken = (req, res, next) => {
  try {
    // split the token from the Bearer
    const token = req.headers.authorization.split(" ")[1];
    // verify the token
    jwt.verify(token, process.env.JWT_SECRET);
    // if token is verified put the user's username and id
    // (which are the jwt's contents) in req.user so
    // the next function can use it
    req.user = JSON.parse(base64.decode(token.split(".")[1]));
    // continue
    next();
  } catch (err) {
    // if error send response
    res.sendStatus(401);
  }
};

const verifyPassword = (req, res, next) => {
  // authenticate username and password
  passport.authenticate(
    "local",
    // function starts here
    (err, user, info) => {
      // if there is an error send a response
      if (err || info) {
        return res.status(401).send(info.message);
      }
      // if there is no error
      // add user to req.user
      req.user = { username: user.username, id: user._id.toString() };
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

module.exports = {
  verifyToken,
  verifyPassword
};
