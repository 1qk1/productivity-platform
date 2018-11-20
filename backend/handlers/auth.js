const jwt = require("jsonwebtoken");

const sendJSONResponse = (req, res) => {
  const { username, _id } = req.user;

  const userData = {
    username,
    id: _id.toString()
  };

  // create new token and send it back
  const token = jwt.sign(userData, process.env.JWT_SECRET);
  res.json({ token, user: userData });
};

module.exports = {
  sendJSONResponse
};
