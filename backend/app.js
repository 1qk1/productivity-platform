const fs = require("fs"),
  express = require("express"),
  app = express(),
  spdy = require("spdy"),
  mongoose = require("mongoose"),
  authRoutes = require("./routes/auth"),
  pomodoroRoutes = require("./routes/pomodoro"),
  boardRoutes = require("./routes/board"),
  extensionRoutes = require("./routes/extensions"),
  passport = require("passport"),
  cors = require("cors"),
  errorMiddleware = require("./middleware/error").errorMiddleware,
  authStrategy = require("./passport");

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

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

passport.use(authStrategy);

app.use(errorMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/pomodoro", pomodoroRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/extensions", extensionRoutes);

const port = process.env.PORT || 3001;

if (process.env.NODE_ENV === "production") {
  const options = {
    cert: fs.readFileSync(__dirname + "/keys/fullchain.pem"),
    key: fs.readFileSync(__dirname + "/keys/privkey.pem")
  };
  spdy.createServer(options, app).listen(port, error => {
    if (error) {
      console.error(error);
      return process.exit(1);
    } else {
      console.log(`HTTP/2 server listening on port: ${port}`);
    }
  });
} else {
  app.listen(port, () => {
    console.log("Development server running on port " + port);
  });
}
