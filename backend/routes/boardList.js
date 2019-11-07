const router = require("express").Router(),
  verifyToken = require("../middleware/auth").verifyToken,
  boardListHandlers = require("../handlers/boardList"),
  { validationCheck, changeListTitle } = require("../middleware/validators");

router.use(verifyToken);

router.post("/", boardListHandlers.newListHandler);

router.put(
  "/",
  changeListTitle,
  validationCheck,
  boardListHandlers.changeListTitle
);

router.delete("/:boardId/:listId", boardListHandlers.deleteListHandler);

module.exports = router;
