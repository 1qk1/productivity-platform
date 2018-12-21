const BoardList = require("../models/boardList"),
  BoardCard = require("../models/boardCard"),
  User = require("../models/user");

const getAllListsHandler = (req, res) => {
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
};

const newListHandler = (req, res) => {
  // get the number of lists for the logged in user
  BoardList.countDocuments({ userId: req.user.id })
    .then(listCount => {
      // extract the data it needs to create a new list
      const boardListData = {
        userId: req.user.id,
        title: "New List",
        // add the new list as the last one
        index: listCount
      };
      // create new list
      BoardList.create(boardListData)
        .then(newList => {
          // get the logged in user to save the list to his account
          User.findById(req.user.id, (error, user) => {
            // push it in the boardlist field
            user.boardLists.push(newList);
            // save updated user
            user.save();
            // send the list back to the user
            res.json({ newList });
          }).catch(error => res.handleError(error));
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
      // delete card itself
      BoardList.deleteOne({ _id: listId })
        .then(() => {
          User.findById(req.user.id)
            .then(user => {
              const listIndex = user.boardLists.findIndex(
                list => list.toString() === listId
              );
              user.boardLists.splice(listIndex, 1);
              user.save();
              res.json({ done: true });
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
