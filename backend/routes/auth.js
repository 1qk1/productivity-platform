const router = require("express").Router(),
  User = require("../models/user"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  passport = require("passport");

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
  (req, res) => {
    // if this function executes it means the credentials are correct
    const { username, _id } = req.user;

    const userData = {
      username,
      id: _id.toString()
    };

    // create new token and send it back
    const token = jwt.sign(userData, process.env.JWT_SECRET);
    res.json({ token, user: userData });
  }
);

module.exports = router;
