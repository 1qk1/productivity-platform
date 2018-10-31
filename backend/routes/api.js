const router = require("express").Router(),
  jwt = require("jsonwebtoken"),
  middleware = require("../middleware");

router.get("/test", middleware.verifyToken, (req, res) => {
  res.send("it works!");
});

module.exports = router;
