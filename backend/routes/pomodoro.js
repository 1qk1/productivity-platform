const router = require("express").Router(),
  middleware = require("../middleware"),
  pomodoroHandlers = require("../handlers/pomodoro");

router.get("/", middleware.verifyToken, pomodoroHandlers.getAllPomodoros);

router.post("/", middleware.verifyToken, pomodoroHandlers.newPomodoro);

module.exports = router;
