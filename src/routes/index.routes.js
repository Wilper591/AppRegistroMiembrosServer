const { Router } = require("express");
const router = Router();
const rutasLogin = require("./login.routes.js");
const rutasPlayer = require("./player.routes.js");

router.use("/login", rutasLogin);
router.use("/players", rutasPlayer);

module.exports = router;
