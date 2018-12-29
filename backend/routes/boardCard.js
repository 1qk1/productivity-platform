const router = require("express").Router(),
  verifyToken = require("../middleware/auth").verifyToken,
  boardCardHandlers = require("../handlers/boardCard");

router.use(verifyToken);

router.post("/", boardCardHandlers.newCardHandler);

router.put("/", boardCardHandlers.editCardHandler);

router.put("/moveCard", boardCardHandlers.moveCardHandler);

router.delete("/:listId/:cardId", boardCardHandlers.deleteCardHandler);

module.exports = router;
