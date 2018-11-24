const router = require("express").Router(),
  Pomodoro = require("../models/pomodoro"),
  middleware = require("../middleware");

router.post("/", middleware.verifyToken, (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  Pomodoro.create({ userId }, (error, newPomodoro) => {
    if (error) {
      res.send(error);
    } else {
      res.json(newPomodoro);
    }
  });
});

router.get("/", middleware.verifyToken, (req, res) => {
  const userId = req.user.id;
  Pomodoro.find({ userId }, (error, pomodoros) => {
    if (error) {
      res.send(error);
    } else {
      res.json(pomodoros);
    }
  });
});

module.exports = router;
