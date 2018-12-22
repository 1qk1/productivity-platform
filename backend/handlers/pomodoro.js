const Pomodoro = require("../models/pomodoro"),
  User = require("../models/user");

const getAllPomodoros = (req, res) => {
  // get the user's id
  const userId = req.user.id;
  // find all pomodoros for that user
  Pomodoro.find({ userId })
    .then(pomodoros => {
      // else send back all the user's pomodoros
      res.json(pomodoros);
    })
    .catch(error => res.handleError(error));
};

const newPomodoro = (req, res) => {
  // get the user's id
  const userId = req.user.id;
  // create a new pomodoro for the user
  Pomodoro.create({ userId })
    .then(newPomodoro => {
      // get the logged in user
      User.findByIdAndUpdate(
        userId,
        // push the new pomodoro in the array of
        // pomodoros in the user's account
        { $push: { pomodoros: newPomodoro } },
        { useFindAndModify: false }
      )
        .then(() => {
          //  send back the new pomodoro
          res.json({ newPomodoro });
        })
        .catch(error => res.handleError(error));
    })
    .catch(error => res.handleError(error));
};

module.exports = {
  getAllPomodoros,
  newPomodoro
};
