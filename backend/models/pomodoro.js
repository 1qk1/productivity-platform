const mongoose = require("mongoose"),
  bcrypt = require("bcrypt");

const pomodoroSchema = new mongoose.Schema({});

const Pomodoro = mongoose.model("pomodoro", pomodoroSchema);

module.exports = Pomodoro;
