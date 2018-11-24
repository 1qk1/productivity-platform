const router = require("express").Router(),
  User = require("../models/user"),
  sendJSONResponse = require("../handlers/auth").sendJSONResponse,
  verifyPassword = require("../middleware").verifyPassword;

router.post("/register", async (req, res) => {
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
});

router.post(
  "/login",
  // check the credentials sent by the user
  verifyPassword,
  // if they correct, send a JWT response
  sendJSONResponse
);

module.exports = router;
