const express = require("express");
const cors = require("cors");
const router = express.Router();
const {
  checkCredentialsExists,
  tokenVerification,
} = require("../middlewares/middlewares");
const indexController = require("../controllers/indexController");

router.post("/registro", indexController.registroUsuario);

router.post("/login", indexController.iniciarSesion);

router.put("/usuario/:id", indexController.editarUsuario);
router.post("/registro/recinto", indexController.registroRecinto);
router.post("/reserva", indexController.registroReserva);
router.post("/registro/cancha", indexController.registroCancha);
router.get("/recintos/tenant", indexController.getRecintosTenant);
router.get("/recintos/usuario", indexController.getRecintosUser);
router.put("/recinto/:id", indexController.editarRecinto);
router.put("/cancha/:id", indexController.editarCancha);

module.exports = router;
