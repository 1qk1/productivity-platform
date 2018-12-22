const BoardList = require("../models/boardList"),
  BoardCard = require("../models/boardCard"),
  User = require("../models/user");

const getAllListsHandler = (req, res) => {
  // find all lists for current logged in user
  BoardList.find({ userId: req.user.id })
    // populate cards (if any)
    .populate("cards")
    .then(lists => {
      // send it back to the user
      res.json({ lists });
    })
    .catch(error => res.handleError(error));
};

const newListHandler = (req, res) => {
  // extract the data we need to create a new list
  const boardListData = {
    userId: req.user.id,
    title: "New List"
  };
  // create new list
  BoardList.create(boardListData)
    .then(newList => {
      // get the logged in user to save the list to his account
      User.findByIdAndUpdate(
        req.user.id,
        // push the list in user's lists array
        { $push: { boardLists: newList } },
        { useFindAndModify: false }
      )
        .then(() => {
          // send the list back to the user
          res.json({ newList });
        })
        .catch(error => res.handleError(error));
    })
    .catch(error => res.handleError(error));
};

const editListHandler = (req, res) => {
  // find by id and update
  BoardList.findByIdAndUpdate(
    // id
    req.body.id,
    // property to change
    { ...req.body.edit },
    // don't use deprecated function
    { useFindAndModify: false }
  )
    .then(foundList => {
      // update the object to send it back to the user
      // foundList has the old title although it has been
      // updated in the database
      const updated = { ...foundList.toObject(), ...req.body.edit };
      // send it back to the user
      res.json({ updatedList: updated });
    })
    .catch(error => res.handleError(error));
};

const deleteListHandler = (req, res) => {
  // deconstruct the data we need to delete a list
  const { listId } = req.params;
  // delete all cards under a list
  BoardCard.deleteMany({ listId })
    .then(() => {
      // delete the list itself
      BoardList.deleteOne({ _id: listId })
        .then(() => {
          // find the user
          User.findByIdAndUpdate(
            req.user.id,
            // pull from the boardList array
            // all values(lists) that equal listId.
            // the list we want to remove will so it will
            // match with listId
            { $pull: { boardList: listId } },
            { useFindAndModify: false }
          )
            .then(() => {
              // send reponse that everything was done
              res.sendStatus(200);
            })
            .catch(error => res.handleError(error));
        })
        .catch(error => res.handleError(error));
    })
    .catch(error => res.handleError(error));
};

module.exports = {
  getAllListsHandler,
  newListHandler,
  editListHandler,
  deleteListHandler
};
