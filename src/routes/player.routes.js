const { Router } = require("express");
const router = Router();
const {
  obtenerPlayers,
  obtenerPlayerByName,
  crearPlayer,
  editarInfoPlayer,
  actualizarPuntajePlayer,
} = require("../controllers/players.controller.js");
const checkAuth = require("../middlewares/authMiddleware.js");

router.get("/", checkAuth, obtenerPlayers);
router.post("/find", checkAuth, obtenerPlayerByName);
router.post("/newPlayer", checkAuth, crearPlayer)
router.put("/editInfo", checkAuth, editarInfoPlayer);
router.put("/editPuntaje", checkAuth, actualizarPuntajePlayer);
module.exports = router;
