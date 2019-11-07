const BoardCard = require("../models/boardCard"),
  Board = require("../models/board"),
  CustomError = require("../middleware/error").CustomError,
  { ObjectId } = require("mongoose").Types;

const newListHandler = (req, res) => {
  // extract the data we need to create a new list
  const { boardId } = req.body;

  // create new list
  const newList = { boardId };

  // add list to board
  Board.findOneAndUpdate(
    {
      $and: [
        // get the board that matches the id in the parameter
        { _id: req.body.boardId },
        // and
        { owner: req.user.id }
      ]
    },
    { $push: { lists: newList } },
    { useFindAndModify: false, new: true }
  )
    .then(newBoard => {
      // send the list back to the user
      res.json({ newList: newBoard.lists[newBoard.lists.length - 1] });
    })
    .catch(res.handleError);
};

const changeListTitle = (req, res) => {
  // find board by id and update list
  Board.findOneAndUpdate(
    // get the board that matches the id
    {
      $and: [
        // get the board that matches the id in the parameter
        { _id: req.body.boardId },
        // and is owned by the logged in user
        { owner: req.user.id }
      ]
    },
    // property to change
    { $set: { "lists.$[list].title": req.body.newTitle } },
    {
      // don't use deprecated function
      useFindAndModify: false,
      new: true,
      arrayFilters: [{ "list._id": ObjectId(req.body.listId) }]
    }
  )
    .lean()
    .then(updatedBoard => {
      const updatedList = updatedBoard.lists.find(
        list => list._id.toString() === req.body.listId
      );
      delete updatedList.cards;
      // send the list back to the user
      res.json({ updatedList });
    })
    .catch(res.handleError);
};

const deleteListHandler = (req, res) => {
  // deconstruct the data we need to delete a list
  const { listId, boardId } = req.params;

  // get the board
  Board.findOne({
    $and: [
      // get the card that matches the id in the parameter
      { _id: boardId },
      // and is owned by the logged in user
      { owner: req.user.id }
    ]
  })
    .then(async board => {
      // send reponse that everything was done
      const cards = board.lists.id(listId).cards;
      if (cards.length > 0) {
        await BoardCard.deleteMany({ _id: { $in: cards } }).catch(
          res.handleError
        );
      }
      board.lists.id(listId).remove();
      board.save().then(() => {
        res.sendStatus(200);
      });
    })
    .catch(res.handleError);
};

module.exports = {
  newListHandler,
  changeListTitle,
  deleteListHandler
};
