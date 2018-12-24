const router = require("express").Router(),
  verifyToken = require("../middleware/auth").verifyToken,
  boardListHandlers = require("../handlers/boardList");

router.use(verifyToken);

router.get("/", boardListHandlers.getAllListsHandler);

router.post("/", boardListHandlers.newListHandler);

router.put("/", boardListHandlers.editListHandler);

router.delete("/:listId", boardListHandlers.deleteListHandler);

module.exports = router;
