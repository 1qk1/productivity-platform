const jwt = require("jsonwebtoken");

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

module.exports = {
  sendJSONResponse
};
