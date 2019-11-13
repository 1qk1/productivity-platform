const { body, validationResult } = require("express-validator"),
  { CustomError } = require("./error");

const validationCheck = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.handleError(new CustomError(422, errors.array()[0].msg));
  }
  next();
};

const newBoard = [
  body("boardTitle")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Board title cannot be empty.")
];
const editBoard = [
  body("boardTitle")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Board title cannot be empty.")
];
const changeListTitle = [
  body("newTitle")
    .trim()
    .not()
    .isEmpty()
    .withMessage("List title cannot be empty.")
];
const cardText = [
  body("text")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Card text cannot be empty.")
];

module.exports = {
  validationCheck,
  newBoard,
  editBoard,
  changeListTitle,
  cardText
};
