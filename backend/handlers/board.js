const Board = require("../models/board"),
  BoardCard = require("../models/boardCard"),
  User = require("../models/user"),
  CustomError = require("../middleware/error").CustomError,
  { randomColor, isValidColor } = require("../helpers/colors");

const getAllBoardsHandler = (req, res) => {
  // get user's boards
  User.findById(req.user.id, "extensionData.boards")
    // populate them
    .populate("extensionData.boards")
    .then(data => {
      // send the boards backs
      const { boards } = data.extensionData;
      res.json({ boards });
    });
};

const getSingleBoardHandler = (req, res) => {
  // get requested board if the current logged in user
  // is in the list of authors or if the board is public
  Board.findOne({
    $and: [
      // get the board that matches the id in the parameter
      { _id: req.params.boardId },
      // and
      {
        $or: [
          // has the user in the list of authors
          { owner: { $eq: req.user.id } },
          // or is public
          { private: { $eq: false } }
        ]
      }
    ]
  })
    .populate("lists.cards")
    .lean()
    .then(board => {
      if (board === null) {
        return res.handleError(
          new CustomError(403, "You are not allowed to view this board")
        );
      }
      res.json({ board });
    })
    .catch(res.handleError);
};

const newBoardHandler = (req, res) => {
  // extract the data we need to create a new board
  const boardData = {
    owner: req.user.id,
    title: req.body.boardTitle,
    color: req.body.boardColor || randomColor(),
    privacy: req.body.boardPrivacy
  };
  // create new list
  Board.create(boardData)
    .then(newBoard => {
      // get the logged in user to save the list to his account
      User.findByIdAndUpdate(
        req.user.id,
        // push the list in user's boards array
        {
          $push: {
            "extensionData.boards": {
              $each: [newBoard],
              $position: 0
            }
          }
        },
        { useFindAndModify: false }
      )
        .then(() => {
          // send the board back to the user
          res.json({ newBoard });
        })
        .catch(res.handleError);
    })
    .catch(res.handleError);
};

const editBoardHandler = (req, res) => {
  let { boardId, boardTitle, boardColor, boardPrivate } = req.body;
  if (!isValidColor(boardColor)) {
    boardColor = randomColor();
  }
  // find by id and update
  Board.findOneAndUpdate(
    {
      $and: [
        // get the board that matches the id in the parameter
        { _id: boardId },
        // and
        { owner: req.user.id }
      ]
    },
    // properties to change
    {
      $set: {
        title: boardTitle,
        color: boardColor,
        private: Boolean(boardPrivate)
      }
    },
    // don't use deprecated function, return updated board
    { useFindAndModify: false, new: true }
  )
    .lean()
    .then(updatedBoard => {
      // send the updated properties back to the user
      const { _id, title, color, private } = updatedBoard;
      res.json({ updatedBoard: { _id, title, color, private } });
    })
    .catch(res.handleError);
};

const deleteBoardHandler = (req, res) => {
  const { boardId } = req.params;

  Board.findOne({
    $and: [
      // get the card that matches the id in the parameter
      { _id: boardId },
      // and is owned by the logged in user
      { owner: req.user.id }
    ]
  })
    .lean()
    .then(board => {
      const lists = board.lists;
      // get all cards in all lists
      const allCards = lists.reduce((all, curr) => {
        if (curr.cards.length > 0) {
          return all.concat(...curr.cards);
        }
        return all;
      }, []);

      let cardsDeletePromise = null;
      // if we have cards
      if (allCards.length > 0) {
        // delete them assign the promise to the variable
        cardsDeletePromise = BoardCard.deleteMany({
          _id: { $in: allCards }
        }).exec();
      }
      const boardDeletePromise = Board.deleteOne({ _id: boardId }).exec();
      const userPromise = User.findByIdAndUpdate(
        req.user.id,
        { $pull: { "extensionData.boards": boardId } },
        { useFindAndModify: false }
      ).exec();
      Promise.all([cardsDeletePromise, boardDeletePromise, userPromise])
        .then(() => {
          res.sendStatus(200);
        })
        .catch(res.handleError);
    })
    .catch(res.handleError);
};

module.exports = {
  getAllBoardsHandler,
  getSingleBoardHandler,
  newBoardHandler,
  editBoardHandler,
  deleteBoardHandler
};
