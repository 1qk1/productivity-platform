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
      console.log("user created", newUser);
    });
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const { username, _id } = req.user;

    const token = jwt.sign(
      {
        username,
        id: _id.toString()
      },
      process.env.JWT_SECRET
    );
    res.json(token);
  }
);

module.exports = router;
