const router = require("express").Router(),
  authHandlers = require("../handlers/auth"),
  verifyPassword = require("../middleware").verifyPassword;

router.post("/register", authHandlers.registerHandler);

router.post(
  "/login",
  // check the credentials sent by the user
  verifyPassword,
  // if they correct, send a JWT response
  authHandlers.sendJSONResponse
);

module.exports = router;
