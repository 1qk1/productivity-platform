const router = require("express").Router(),
  User = require("../models/user"),
  bcrypt = require("bcrypt"),
  passport = require("passport"),
  sendJSONResponse = require("../handlers/auth").sendJSONResponse;

router.post("/register", async (req, res) => {
  const user = req.body;
  try {
    // check if user exists
    const searchedUser = await User.findOne({ username: user.username });
    if (searchedUser !== null) {
      throw new Error("User already exists");
    }
    // create user
    User.create(user, (err, newUser) => {
      if (err !== null) {
        throw new Error(err);
      } else {
        req.user = newUser;
        sendJSONResponse(req, res);
      }
    });
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post(
  "/login",
  // check the credentials sent by the user
  passport.authenticate("local", { session: false }),
  sendJSONResponse
);

module.exports = router;
