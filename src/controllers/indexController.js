const jwt = require("jsonwebtoken");

const {
  verificarUsuario,
  registrarUsuario,
  actualizarUsuario,
  registrarRecinto,
  actualizarRecinto,
  obtenerRecintosTenant,
  obtenerRecintoUser,
  registrarCancha,
  actualizarCancha,
  registrarReserva,
} = require("../function/functions");

const indexController = {
  iniciarSesion: async (req, res) => {
    try {
      const { email, password } = req.body;
      const token = jwt.sign({ email }, "az_AZ", { expiresIn: "300" });
      await verificarUsuario(email, password);
      res.send(token);
    } catch (e) {
      res.status(404).send(e.message);
    }
  },

  registroUsuario: async (req, res) => {
    try {
      const usuario = req.body;
      await registrarUsuario(usuario);
      res.status(201).send("Usuario creado con éxito");
    } catch (error) {
      res.status(500).send(error);
    }
  },

  editarUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = req.body;
      await actualizarUsuario(usuario, id);
      res.status(201).send("Datos de Usuario actualizados con éxito");
    } catch (error) {
      res.status(500).send(error);
    }
  },

  registroRecinto: async (req, res) => {
    try {
      const recinto = req.body;
      await registrarRecinto(recinto);
      res.status(201).send("Recinto creado con éxito");
    } catch (error) {
      res.status(500).send(error);
    }
  },

  editarRecinto: async (req, res) => {
    try {
      const { id } = req.params;
      const recinto = req.body;
      await actualizarRecinto(recinto, id);
      res.status(201).send("Datos del recinto actualizados con éxito");
    } catch (error) {
      res.status(500).send(error);
    }
  },

  getRecintosTenant: async (req, res) => {
    try {
      const usuario_id = req.body;
      const recintos = await obtenerRecintosTenant(usuario_id);
      res.status(200).send(recintos);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  getRecintosUser: async (req, res) => {
    try {
      const comuna = req.body;
      const recintos = await obtenerRecintoUser(comuna);
      res.status(200).send(recintos);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  registroCancha: async (req, res) => {
    try {
      const cancha = req.body;
      await registrarCancha(cancha);
      res.status(201).send("Cancha creado con éxito");
    } catch (error) {
      res.status(500).send(error);
    }
  },

  editarCancha: async (req, res) => {
    try {
      const { id } = req.params;
      const cancha = req.body;
      await actualizarCancha(cancha, id);
      res.status(201).send("Datos de la cancha actualizados con éxito");
    } catch (error) {
      res.status(500).send(error);
    }
  },

  registroReserva: async (req, res) => {
    try {
      const reserva = req.body;
      await registrarReserva(reserva);
      res.status(201).send("Reserva creada con éxito");
    } catch (error) {
      res.status(500).send(error);
    }
  },

};

module.exports = indexController;
