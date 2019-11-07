const router = require("express").Router(),
  verifyToken = require("../middleware/auth").verifyToken,
  boardHandlers = require("../handlers/board"),
  boardCardRoutes = require("../routes/boardCard"),
  boardListRoutes = require("../routes/boardList"),
  {
    validationCheck,
    newBoard,
    editBoard
  } = require("../middleware/validators");

router.use(verifyToken);

// get all boards
router.get("/", boardHandlers.getAllBoardsHandler);

// get a single board
router.get("/:boardId", boardHandlers.getSingleBoardHandler);

// create new board
router.post("/", newBoard, validationCheck, boardHandlers.newBoardHandler);

// edit a board
router.put("/", editBoard, boardHandlers.editBoardHandler);

// delete a board
router.delete("/:boardId", boardHandlers.deleteBoardHandler);

// card routes
router.use("/card", boardCardRoutes);
// list routes
router.use("/list", boardListRoutes);

module.exports = router;
