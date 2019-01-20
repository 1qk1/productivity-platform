const router = require("express").Router(),
  authHandlers = require("../handlers/auth"),
  verifyPassword = require("../middleware/auth").verifyPassword,
  verifyToken = require("../middleware/auth").verifyToken;

router.post("/register", authHandlers.registerHandler);

router.post(
  "/login",
  // check the credentials sent by the user
  verifyPassword,
  // if they correct, send a JWT response
  authHandlers.sendJSONResponse
);

router.get("/verifyToken", verifyToken, (req, res) => res.sendStatus(200));

module.exports = router;
