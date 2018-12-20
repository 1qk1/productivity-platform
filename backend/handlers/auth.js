const jwt = require("jsonwebtoken"),
  User = require("../models/user");

const sendJSONResponse = (req, res, next) => {
  // get the user's username and id
  const { username, id } = req.user;
  const userData = {
    username,
    id
  };

  // if something goes wrong and req.user
  // has the password and other info, we don't want to
  // send it back with the jwt by accident

  // create new token and send it back to the user
  const token = jwt.sign(userData, process.env.JWT_SECRET);
  res.json({ token, user: userData });
  // if there is a next function run it
  // so we don't need to specify the
  // next function when we don't need it
  if (next !== undefined) {
    next();
  }
};

const registerHandler = async (req, res) => {
  const user = req.body;
  // check if user exists
  const searchedUser = await User.findOne({ username: user.username });
  // if there is already a user with that username,
  // send an error and message
  if (searchedUser !== null) {
    return res.sendStatus(400).send("User already exists.");
  }
  // create user
  User.create(user, (err, newUser) => {
    if (err !== null) {
      // if there is any error, send it to the client
      res.sendStatus(400).send("We couldn't create a user.");
    } else {
      // else
      // add new user's username and id
      // in req.user
      req.user = newUser;
      // and send a JWT response
      sendJSONResponse(req, res);
    }
  });
};

module.exports = {
  sendJSONResponse,
  registerHandler
};
