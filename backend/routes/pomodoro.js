const router = require("express").Router(),
  Pomodoro = require("../models/pomodoro"),
  User = require("../models/user"),
  middleware = require("../middleware");

router.post("/", middleware.verifyToken, (req, res) => {
  // get the user's id
  const userId = req.user.id;
  // create a new pomodoro for the user
  Pomodoro.create({ userId }, (error, newPomodoro) => {
    if (error) {
      // if there is an error, send it back
      return res.status(400).send("Something went wrong");
    } else {
      // get the logged in user to save the pomodoro to his account
      User.findById(userId, (error, user) => {
        if (error) {
          // if there is an error, send it back
          return res.status(400).send("Something went wrong");
        } else {
          // push it in the boardlist field
          user.pomodoros.push(newPomodoro);
          // save updated user
          user.save();
          //  send back the new pomodoro
          res.json(newPomodoro);
        }
      });
    }
  });
});

router.get("/", middleware.verifyToken, (req, res) => {
  // get the user's id
  const userId = req.user.id;
  // find all pomodoros for that user
  Pomodoro.find({ userId }, (error, pomodoros) => {
    if (error) {
      // if there is an error, send it back
      return res.status(400).send("Something went wrong");
    } else {
      // else send back all the user's pomodoros
      res.json(pomodoros);
    }
  });
});

module.exports = router;
