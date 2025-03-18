const { Router } = require("express");
const router = Router();
const {
  obtenerPlayers,
  obtenerPlayerByName,
  crearPlayer,
} = require("../controllers/players.controller.js");
const checkAuth = require("../middlewares/authMiddleware.js");

router.get("/", checkAuth, obtenerPlayers);
router.post("/find", checkAuth, obtenerPlayerByName);
router.post("/newPlayer", checkAuth, crearPlayer)

module.exports = router;
