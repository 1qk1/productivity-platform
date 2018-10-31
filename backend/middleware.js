const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.log("ERROR");
    res.sendStatus(401);
  }
};

module.exports = {
  verifyToken
};
