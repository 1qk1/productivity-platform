const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  authRoutes = require("./routes/auth"),
  pomodoroRoutes = require("./routes/pomodoro"),
  boardRoutes = require("./routes/board"),
  extensionRoutes = require("./routes/extensions"),
  passport = require("passport"),
  cors = require("cors"),
  errorMiddleware = require("./middleware/error").errorMiddleware,
  passportConfig = require("./passport");

require("dotenv").config();

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
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

app.use(express.json());

app.use(passport.initialize());

app.use(errorMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/pomodoro", pomodoroRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/extensions", extensionRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
