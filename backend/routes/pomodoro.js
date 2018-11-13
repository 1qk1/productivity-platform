const router = require("express").Router(),
  Pomodoro = require("../models/pomodoro"),
  middleware = require("../middleware");

router.post("/", middleware.verifyToken, (req, res) => {
  const userId = req.body.userId;
  console.log(userId);
  try {
    Pomodoro.create({ userId }, (error, newPomodoro) => {
      if (error) {
        throw new Error(error);
      } else {
        res.json(newPomodoro);
      }
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/", middleware.verifyToken, (req, res) => {
  const userId = req.user.id;
  Pomodoro.find({ userId }, (error, pomodoros) => {
    res.json(pomodoros);
  });
});

module.exports = router;
