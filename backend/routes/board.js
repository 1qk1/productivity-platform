const router = require("express").Router(),
  middleware = require("../middleware"),
  BoardList = require("../models/boardList"),
  BoardCard = require("../models/boardCard"),
  User = require("../models/user");

router.get("/list", middleware.verifyToken, (req, res) => {
  // find all lists for current logged in user
  BoardList.find({ userId: req.user.id })
    // populate cards (if any)
    // commenting out the code because it breaks the app
    // maybe it's because there is no boardCard collection
    .populate("cards")
    .exec((error, lists) => {
      if (error) {
        return res.status(400).send("Something went wrong");
      }
      // send it back to the user
      res.json({ lists });
    });
});

router.post("/list", middleware.verifyToken, (req, res) => {
  // get the number of lists for the logged in user
  BoardList.countDocuments({ userId: req.user.id }, (error, listCount) => {
    if (error) {
      return res.status(400).send("Something went wrong");
    }
    // extract the data it needs to create a new list
    const boardListData = {
      userId: req.user.id,
      title: "New List",
      // add the new list as the last one
      index: listCount
    };
    // create new list
    BoardList.create(boardListData, (error, newList) => {
      if (error) {
        return res.status(400).send("Something went wrong");
      }
      // get the logged in user to save the list to his account
      User.findById(req.user.id, (error, user) => {
        if (error) {
          return res.status(400).send("Something went wrong");
        } else {
          // push it in the boardlist field
          user.boardLists.push(newList);
          // save updated user
          user.save();
          // send the list back to the user
          res.json({ newList });
        }
      });
    });
  });
});

router.put("/list", middleware.verifyToken, (req, res) => {
  // find by id and update
  BoardList.findByIdAndUpdate(
    // id
    req.body.id,
    // property to change
    { title: req.body.edit.title },
    // don't use deprecated function
    { useFindAndModify: false },
    (error, found) => {
      // if error send error
      if (error) {
        return res.status(400).send("Something went wrong");
      }
      // update the object to send it back to the user
      // found has the old title although it has been
      // updated in the database
      const updated = { ...found.toObject(), title: req.body.edit.title };
      // send it back to the user
      res.json({ updatedList: updated });
    }
  );
});

router.put("/card", middleware.verifyToken, (req, res) => {
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
});

router.post("/card", middleware.verifyToken, (req, res) => {
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
});

router.delete("/card/:listId/:cardId", middleware.verifyToken, (req, res) => {
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
});

router.delete("/list/:listId", middleware.verifyToken, (req, res) => {
  // deconstruct the data we need to delete a list
  const { listId } = req.params;
  // delete all cards under a list
  BoardCard.deleteMany({ listId }, error => {
    if (error) {
      return res.status(400).send("Something went wrong");
    } else {
      // delete card itself
      BoardList.deleteOne({ _id: listId }, error => {
        if (error) {
          return res.status(400).send("Something went wrong");
        } else {
          User.findById(req.user.id, (error, user) => {
            if (error) {
              return res.status(400).send("Something went wrong");
            } else {
              const listIndex = user.boardLists.findIndex(
                list => list.toString() === listId
              );
              user.boardLists.splice(listIndex, 1);
              user.save();
              res.json({ done: true });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
