const router = require("express").Router(),
  Pomodoro = require("../models/pomodoro"),
  middleware = require("../middleware");

router.post("/", middleware.verifyToken, (req, res) => {
  // get the user's id
  const userId = req.user.id;
  // create a new pomodoro for the user
  Pomodoro.create({ userId }, (error, newPomodoro) => {
    if (error) {
      // if there is an error, send it back
      res.send(error);
    } else {
      // else send back the new pomodoro
      res.json(newPomodoro);
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
      res.send(error);
    } else {
      // else send back all the user's pomodoros
      res.json(pomodoros);
    }
  });
});

module.exports = router;
