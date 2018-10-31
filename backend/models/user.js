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
  }
});

userSchema.pre("save", async function(next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

userSchema.methods.validPassword = (localPassword, userPassword) =>
  bcrypt.compareSync(localPassword, userPassword);

const User = mongoose.model("user", userSchema);

module.exports = User;
