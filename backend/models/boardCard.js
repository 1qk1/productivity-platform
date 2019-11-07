const mongoose = require("mongoose");

const boardCardSchema = new mongoose.Schema({
  text: String,
  owner: { type: mongoose.Types.ObjectId, ref: "user" }
});

const BoardCard = mongoose.model("boardCard", boardCardSchema);

module.exports = BoardCard;
