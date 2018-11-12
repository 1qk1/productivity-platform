const router = require("express").Router(),
  jwt = require("jsonwebtoken"),
  middleware = require("../middleware");

router.post("/", middleware.verifyToken, (req, res) => {});

module.exports = router;
