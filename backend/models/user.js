const mongoose = require("mongoose"),
  bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  extensions: [String],
  extensionData: {
    pomodoros: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "pomodoro"
      }
    ],
    boards: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "board"
      }
    ]
  }
});

// encode the password before saving
userSchema.pre("save", async function(next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

// check if the password the user gave us matches the
// user's password from the database
userSchema.methods.validPassword = (localPassword, userPassword) =>
  bcrypt.compare(localPassword, userPassword).then(res => res);

const User = mongoose.model("user", userSchema);

module.exports = User;
