const router = require("express").Router(),
  verifyToken = require("../middleware/auth").verifyToken,
  boardCardHandlers = require("../handlers/boardCard"),
  { validationCheck, cardText } = require("../middleware/validators");

router.use(verifyToken);

router.post("/", cardText, validationCheck, boardCardHandlers.newCardHandler);

router.put("/", cardText, validationCheck, boardCardHandlers.editCardHandler);

router.put("/moveCard", boardCardHandlers.moveCardHandler);

router.delete("/:boardId/:listId/:cardId", boardCardHandlers.deleteCardHandler);

module.exports = router;
