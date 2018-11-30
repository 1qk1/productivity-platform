const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  authRoutes = require("./routes/auth"),
  pomodoroRoutes = require("./routes/pomodoro"),
  boardRoutes = require("./routes/board"),
  passport = require("passport"),
  passportConfig = require("./passport");

require("dotenv").config();

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true },
  error => {
    if (!error) {
      console.log("database connected");
    } else {
      console.log("database connection error:", error);
    }
  }
);
mongoose.set("useCreateIndex", true);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(bodyParser.json());

app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/pomodoro", pomodoroRoutes);
app.use("/board", boardRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
