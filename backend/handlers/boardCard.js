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
  BoardCard.create(cardData, (error, newCard) => {
    if (error) {
      return res.status(400).send("Something went wrong");
    } else {
      BoardList.findById(listId, (error, list) => {
        if (error) {
          return res.status(400).send("Something went wrong");
        } else {
          list.cards.push(newCard);
          list.save();
          res.json({ newCard });
        }
      });
    }
  });
};

const editCardHandler = (req, res) => {
  // find by id and update
  BoardCard.findByIdAndUpdate(
    // id
    req.body.id,
    //   // properties to change
    { ...req.body.edit },
    // don't use deprecated function
    { useFindAndModify: false },
    (error, found) => {
      // if error send error
      if (error) {
        return res.status(400).send("Something went wrong");
      }
      // update the object to send it back to the user
      // found has the old text although it has been
      // updated in the database
      const updated = { ...found.toObject(), ...req.body.edit };
      // send it back to the user
      res.json({ updatedCard: updated });
    }
  );
};

const deleteCardHandler = (req, res) => {
  // deconstruct the data we need to delete a card
  const { listId, cardId } = req.params;
  // delete card
  BoardCard.deleteOne({ _id: cardId }, error => {
    if (error) {
      return res.status(400).send("Something went wrong");
    } else {
      // delete card reference from list entry
      BoardList.findById(listId, (error, list) => {
        if (error) {
          return res.status(400).send("Something went wrong");
        } else {
          // find index
          const cardIndex = list.cards.findIndex(
            card => card._id.toString() === cardId
          );
          // delete card
          list.cards.splice(cardIndex, 1);
          // save
          list.save();
          res.json({ done: true });
        }
      });
    }
  });
};

module.exports = {
  newCardHandler,
  editCardHandler,
  deleteCardHandler
};
