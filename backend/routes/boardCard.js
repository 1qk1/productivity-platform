const router = require("express").Router(),
  middleware = require("../middleware"),
  boardCardHandlers = require("../handlers/boardCard");

router.post("/", middleware.verifyToken, boardCardHandlers.newCardHandler);

router.put("/", middleware.verifyToken, boardCardHandlers.editCardHandler);

router.delete(
  "/:listId/:cardId",
  middleware.verifyToken,
  boardCardHandlers.deleteCardHandler
);

module.exports = router;
