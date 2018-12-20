const router = require("express").Router(),
  verifyToken = require("../middleware/auth").verifyToken,
  pomodoroHandlers = require("../handlers/pomodoro");

router.use(verifyToken);

router.get("/", pomodoroHandlers.getAllPomodoros);

router.post("/", pomodoroHandlers.newPomodoro);

module.exports = router;
