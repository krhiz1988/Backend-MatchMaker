const express = require("express");
const {
  checkCredentialsExists,
  tokenVerification,
} = require("../middlewares/middlewares");
const indexController = require("../controllers/indexController");
const router = express.Router();

router.post("/login", indexController.iniciarSesion);
router.post(
  "/registro",
  checkCredentialsExists,
  indexController.registroUsuario
);
router.put(
  "/usuario/:id",
  tokenVerification,
  checkCredentialsExists,
  indexController.editarUsuario
);
router.post("/registro/recinto", indexController.registroRecinto);
router.put("/recinto/:id", indexController.editarRecinto);
router.get("/recintos/tenant", indexController.getRecintosTenant);
router.get("/recintos/usuario", indexController.getRecintosUser);
router.post("/registro/cancha", indexController.registroCancha)
router.put("/cancha/:id", indexController.editarCancha)
router.post("/reserva", indexController.registroReserva)




module.exports = router;
