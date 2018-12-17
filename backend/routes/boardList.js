const router = require("express").Router(),
  middleware = require("../middleware"),
  boardListHandlers = require("../handlers/boardList");

router.get("/", middleware.verifyToken, boardListHandlers.getAllListsHandler);

router.post("/", middleware.verifyToken, boardListHandlers.newListHandler);

router.put("/", middleware.verifyToken, boardListHandlers.editListHandler);

router.delete(
  "/:listId",
  middleware.verifyToken,
  boardListHandlers.deleteListHandler
);

module.exports = router;
