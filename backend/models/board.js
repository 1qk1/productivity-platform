const mongoose = require("mongoose");

const boardListSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "New List"
  },
  cards: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "boardCard"
    }
  ]
});
boardListSchema.index({ cards: 1 });

const boardSchema = new mongoose.Schema({
  owner: mongoose.SchemaTypes.ObjectId,
  title: String,
  lists: [boardListSchema],
  private: {
    type: Boolean,
    default: true
  },
  color: String
});

boardSchema.index({ owner: 1 });

const Board = mongoose.model("board", boardSchema);

module.exports = Board;
