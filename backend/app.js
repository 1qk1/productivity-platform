const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  authRoutes = require("./routes/auth"),
  pomodoroRoutes = require("./routes/pomodoro"),
  boardListRoutes = require("./routes/boardList"),
  boardCardRoutes = require("./routes/boardCard"),
  extensionRoutes = require("./routes/extensions"),
  passport = require("passport"),
  cors = require("cors"),
  errorMiddleware = require("./middleware/error").errorMiddleware,
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

app.use(cors());

app.use(bodyParser.json());

app.use(passport.initialize());

app.use(errorMiddleware);

app.use("/auth", authRoutes);
app.use("/pomodoro", pomodoroRoutes);
app.use("/board/list", boardListRoutes);
app.use("/board/card", boardCardRoutes);
app.use("/extensions", extensionRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
