const mongoose = require("mongoose");

const boardListSchema = new mongoose.Schema({
  userId: mongoose.SchemaTypes.ObjectId,
  title: String,
  cards: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "boardCard"
    }
  ],
  index: Number
});

const BoardList = mongoose.model("boardList", boardListSchema);

module.exports = BoardList;
