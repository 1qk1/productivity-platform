const router = require("express").Router(),
  middleware = require("../middleware"),
  BoardList = require("../models/boardList"),
  User = require("../models/user");

router.get("/list", middleware.verifyToken, (req, res) => {
  // find all lists for current logged in user
  BoardList.find({ userId: req.user.id })
    // populate cards (if any)
    // commenting out the code because it breaks the app
    // maybe it's because there is no boardCard collection
    // .populate("cards")
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

router.put("/list", (req, res) => {
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

module.exports = router;
