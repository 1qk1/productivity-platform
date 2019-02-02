const jwt = require("jsonwebtoken"),
  User = require("../models/user"),
  CustomError = require("../middleware/error").CustomError;

const sendNewToken = (req, res, next) => {
  // get the user's username and id
  const { username, id, extensions } = req.user;
  const userData = {
    username,
    id
  };

  // create new token and send it back to the user
  const token = jwt.sign(userData, process.env.JWT_SECRET);
  res.json({ token, user: { ...userData, extensions } });
  // if there is a next function run it
  // so we don't need to specify the
  // next function when we don't need it
  if (next !== undefined) {
    next();
  }
};

const sendUserJSON = (req, res) => {
  User.findById(req.user.id).then(user => {
    const userJSON = {
      username: user.username,
      id: user._id,
      extensions: user.extensions
    };
    res.json({ user: userJSON });
  });
};

const registerHandler = (req, res) => {
  const user = req.body;
  // check if user exists
  User.findOne({ username: user.username })
    .then(foundUser => {
      // if there is already a user with that username,
      // send an error and message
      if (foundUser !== null)
        throw new CustomError(400, "User already exists.");
      // create user
      User.create(user)
        .then(newUser => {
          // add new user's username and id
          // in req.user
          req.user = newUser;
          // and send a JWT response
          sendJSONResponse(req, res);
        })
        .catch(error => res.handleError(error));
    })
    .catch(error => res.handleError(error));
};

module.exports = {
  sendNewToken,
  registerHandler,
  sendUserJSON
};
