const mongoose = require("mongoose");

const boardCardSchema = new mongoose.Schema({
  userId: mongoose.SchemaTypes.ObjectId,
  text: String,
  listId: mongoose.SchemaTypes.ObjectId
});

const BoardCard = mongoose.model("boardCard", boardCardSchema);

module.exports = BoardCard;
