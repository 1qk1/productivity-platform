const Board = require("../models/board"),
  BoardCard = require("../models/boardCard"),
  { ObjectId } = require("mongoose").Types;

const newCardHandler = (req, res) => {
  // deconstruct the data we need to make a card
  const { text, listId, boardId } = req.body;
  // create the card data
  const cardData = {
    text,
    owner: req.user.id
  };
  // create card
  BoardCard.create(cardData)
    .then(newCard => {
      // get the list to save the card
      Board.updateOne(
        { _id: boardId },
        // push the new card in the list's array of cards
        { $push: { "lists.$[listId].cards": newCard } },
        {
          useFindAndModify: false,
          arrayFilters: [{ "listId._id": ObjectId(listId) }]
        }
      )
        .then(() => {
          // send the card back to the user
          res.json({ newCard });
        })
        .catch(res.handleError);
    })
    .catch(res.handleError);
};

const editCardHandler = (req, res) => {
  const { text } = req.body;
  // find by id and update
  BoardCard.findOneAndUpdate(
    {
      $and: [
        // get the card that matches the id in the parameter
        { _id: req.body.cardId },
        // and is owned by the logged in user
        { owner: req.user.id }
      ]
    },
    // properties to change
    { $set: { text } },
    // don't use deprecated function
    { useFindAndModify: false, new: true }
  )
    .then(updatedCard => {
      // update the object to send it back to the user
      // found has the old text although it has been
      // updated in the database
      // send it back to the user
      res.json({
        updatedCard: { _id: updatedCard._id, text: updatedCard.text }
      });
    })
    .catch(res.handleError);
};

const moveCardHandler = (req, res) => {
  const { boardId, fromList, toList, cardId, toIndex } = req.body;

  const pullPromise = Board.findOneAndUpdate(
    boardId,
    // pull cardId from fromList
    {
      $pull: { "lists.$[list].cards": ObjectId(cardId) }
    },
    {
      useFindAndModify: false,
      arrayFilters: [{ "list._id": ObjectId(fromList) }]
    }
  ).exec();
  const pushPromise = Board.findOneAndUpdate(
    boardId,
    // add cardId to position
    {
      $push: {
        "lists.$[list].cards": {
          $each: [ObjectId(cardId)],
          $position: toIndex
        }
      }
    },
    {
      useFindAndModify: false,
      arrayFilters: [{ "list._id": ObjectId(toList) }]
    }
  ).exec();

  Promise.all([pullPromise, pushPromise])
    .then(() => res.sendStatus(200))
    .catch(res.handleError);
};

const deleteCardHandler = (req, res) => {
  // deconstruct the data we need to delete a card
  const { boardId, listId, cardId } = req.params;
  // delete card
  Board.findOneAndUpdate(
    {
      $and: [
        // get the board that matches the id in the parameter
        { _id: boardId },
        // and
        { owner: req.user.id }
      ]
    },
    {
      $pull: { "lists.$[list].cards": ObjectId(cardId) }
    },
    {
      useFindAndModify: false,
      arrayFilters: [{ "list._id": ObjectId(listId) }]
    }
  )
    .then(() => {
      // send reponse that everything was done
      BoardCard.deleteOne({ _id: cardId })
        .then(() => {
          // delete card reference from list entry
          res.sendStatus(200);
        })
        .catch(res.handleError);
    })
    .catch(res.handleError);
};

module.exports = {
  newCardHandler,
  editCardHandler,
  deleteCardHandler,
  moveCardHandler
};
