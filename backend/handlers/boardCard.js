const BoardList = require("../models/boardList"),
  BoardCard = require("../models/boardCard");

const newCardHandler = (req, res) => {
  // deconstruct the data we need to make a card
  const { text, listId } = req.body;
  // create the card data
  const cardData = {
    text,
    listId,
    userId: req.user.id
  };
  // create card
  BoardCard.create(cardData)
    .then(newCard => {
      BoardList.findById(listId)
        .then(list => {
          list.cards.push(newCard);
          list.save();
          res.json({ newCard });
        })
        .catch(error => res.handleError(error));
    })
    .catch(error => res.handleError(error));
};

const editCardHandler = (req, res) => {
  // find by id and update
  BoardCard.findByIdAndUpdate(
    // id
    req.body.id,
    //   // properties to change
    { ...req.body.edit },
    // don't use deprecated function
    { useFindAndModify: false }
  )
    .then(found => {
      // update the object to send it back to the user
      // found has the old text although it has been
      // updated in the database
      const updated = { ...found.toObject(), ...req.body.edit };
      // send it back to the user
      res.json({ updatedCard: updated });
    })
    .catch(error => res.handleError(error));
};

const deleteCardHandler = (req, res) => {
  // deconstruct the data we need to delete a card
  const { listId, cardId } = req.params;
  // delete card
  BoardCard.deleteOne({ _id: cardId })
    .then(() => {
      // delete card reference from list entry
      BoardList.findById(listId)
        .then(list => {
          // find index
          const cardIndex = list.cards.findIndex(
            card => card._id.toString() === cardId
          );
          // delete card
          list.cards.splice(cardIndex, 1);
          // save
          list.save();
          res.json({ done: true });
        })
        .catch(error => res.handleError(error));
    })
    .catch(error => res.handleError(error));
};

module.exports = {
  newCardHandler,
  editCardHandler,
  deleteCardHandler
};
