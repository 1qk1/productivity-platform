const jwt = require("jsonwebtoken"),
  base64 = require("js-base64").Base64;

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET);
    req.user = JSON.parse(base64.decode(token.split(".")[1]));
    next();
  } catch (err) {
    console.log("ERROR");
    res.sendStatus(401);
  }
};

module.exports = {
  verifyToken
};
