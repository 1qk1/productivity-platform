const router = require("express").Router(),
  verifyToken = require("../middleware/auth").verifyToken,
  extensionHandlers = require("../handlers/extensions");

router.use(verifyToken);

router.post("/", extensionHandlers.addExtension);

router.delete("/:extensionName", extensionHandlers.removeExtension);

module.exports = router;
