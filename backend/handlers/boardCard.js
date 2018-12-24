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
      // get the list to save the card
      BoardList.findByIdAndUpdate(
        listId,
        // push the new card in the list's array of cards
        { $push: { cards: newCard } },
        { useFindAndModify: false }
      )
        .then(() => {
          // send the card back to the user
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

const changeCardList = (req, res) => {
  const { fromList, toList, cardId } = req.body;
  // get the fromList and toList from the db
  // remove the card from fromlist
  // add the card to toList
  // get the card itself
  // update listId to the new list id
  // send back the edited card
  BoardList.find({
    _id: { $in: [fromList, toList] }
  })
    .then(found => {
      BoardCard.findById(cardId).then(cardToMove => {
        // console.log(found, "found");
        const [from, to] =
          found[0]._id.toString() === fromList
            ? [found[0], found[1]]
            : [found[1], found[0]];
        const cardindex = from.cards.findIndex(
          card => card._id.toString() === cardId
        );
        from.cards.splice(cardindex, 1);
        to.cards.push(cardToMove);
        cardToMove.listId = to._id;
        Promise.all([from.save(), to.save(), cardToMove.save()])
          .then(() => {
            res.sendStatus(200);
          })
          .catch(res.handleError);
      });
    })
    .catch(res.handleError);
  // console.log(req.body);
};

// const deleteCardHandler = (req, res) => {
//   // deconstruct the data we need to delete a card
//   const { listId, cardId } = req.params;
//   // delete card
//   BoardCard.deleteOne({ _id: cardId })
//     .then(() => {
//       // delete card reference from list entry
//       BoardList.findByIdAndUpdate(
//         listId,
//         // pull from the list of cards, all values
//         // that equal cardId
//         // the card we want to remove will
//         // be an ObjectId reference so it will
//         // match with cardId
//         { $pull: { cards: cardId } },
//         { useFindAndModify: false }
//       )
//         .then(() => {
//           // send reponse that everything was done
//           res.sendStatus(200);
//         })
//         .catch(error => res.handleError(error));
//     })
//     .catch(error => res.handleError(error));
// };

const deleteCardHandler = (req, res) => {
  // deconstruct the data we need to delete a card
  const { listId, cardId } = req.params;
  // delete card
  BoardList.findByIdAndUpdate(
    listId,
    // pull from the list of cards, all values
    // that equal cardId
    // the card we want to remove will
    // be an ObjectId reference so it will
    // match with cardId
    { $pull: { cards: cardId } },
    { useFindAndModify: false }
  )
    .then(() => {
      // send reponse that everything was done
      res.sendStatus(200);
      BoardCard.deleteOne({ _id: cardId })
        .then(() => {
          // delete card reference from list entry
        })
        .catch(error => res.handleError(error));
    })
    .catch(error => res.handleError(error));
};

module.exports = {
  newCardHandler,
  editCardHandler,
  deleteCardHandler,
  changeCardList
};
