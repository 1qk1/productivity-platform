const User = require("../models/user");

const addExtension = (req, res) => {
  const extension = req.body.extensionName;

  User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { extensions: extension } },
    { useFindAndModify: false }
  )
    .then(() => {
      res.sendStatus(200);
    })
    .catch(res.handleError);
};

const removeExtension = (req, res) => {
  const extension = req.params.extensionName;

  User.findByIdAndUpdate(
    req.user.id,
    { $pull: { extensions: extension } },
    { useFindAndModify: false }
  )
    .then(() => {
      res.sendStatus(200);
    })
    .catch(res.handleError);
};

module.exports = {
  addExtension,
  removeExtension
};
