const { Router } = require("express");
const router = Router();
const { userLogin, perfilUser } = require("../controllers/login.controller.js");
const checkAuth = require("../middlewares/authMiddleware.js");

router
    .route("/")
    .post(userLogin)
    .get(checkAuth, perfilUser);

module.exports = router;
