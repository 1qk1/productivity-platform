const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  authRoutes = require("./routes/auth"),
  apiRoutes = require("./routes/api"),
  passport = require("passport"),
  passportConfig = require("./passport");

require("dotenv").config();

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true },
  () => {
    console.log("database connected");
  }
);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
