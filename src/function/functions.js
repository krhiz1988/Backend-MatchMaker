const bcrypt = require("bcryptjs");
require("dotenv").config();
const { Pool } = require("pg");

const host = process.env.PGHOST || process.env.DB_HOST
const user = process.env.PGUSER || process.env.DB_USER
const database = process.env.PGDATABASE || process.env.DB_NAME
const password = process.env.PGPASSWORD || process.env.DB_PASSWORD

const pool = new Pool({
  host: host,
  user: user,
  password: password,
  database: database,
  allowExitOnIdle: true,
});

const verificarUsuario = async (email, password) => {
  const values = [email];
  const consulta = "SELECT * FROM usuarios WHERE email = $1";
  const { rows, rowCount } = await pool.query(consulta, values);
  if (rowCount === 0) {
    throw { code: 401, message: "Email o contraseña incorrecta" };
  }

  const passwordEncriptada = rows[0].password;

  const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);
  if (!passwordEsCorrecta || !rowCount)
    throw { code: 401, message: "Email o contraseña incorrecta" };
};


const registrarUsuario = async (usuario) => {
  let {
    nombre,
    apellido_paterno,
    rut,
    email,
    telefono,
    direccion,
    comuna,
    region,
    tipo_user,
    password,
  } = usuario;
  const passwordEncriptada = bcrypt.hashSync(password);
  password = passwordEncriptada;
  const values = [
    nombre,
    apellido_paterno,
    rut,
    email,
    telefono,
    direccion,
    comuna,
    region,
    tipo_user,
    passwordEncriptada,
  ];
  const consulta =
    "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
  await pool.query(consulta, values);
};

const actualizarUsuario = async (usuario, id) => {
  let {
    nombre,
    apellido_paterno,
    rut,
    email,
    telefono,
    direccion,
    comuna,
    region,
    password,
  } = usuario;
  const passwordEncriptada = bcrypt.hashSync(password);
  password = passwordEncriptada;
  const values = [
    nombre,
    apellido_paterno,
    rut,
    email,
    telefono,
    direccion,
    comuna,
    region,
    password,
    id,
  ];
  const consulta =
    "UPDATE usuarios SET nombre = $1, apellido_paterno = $2, rut = $3, email = $4, telefono = $5, direccion = $6, comuna = $7, region = $8, password = $9 WHERE id = $10";
  await pool.query(consulta, values);
};

const registrarRecinto = async (recinto) => {
  let { usuarios_id, nombre, telefono, email, direccion, comuna, estado } =
    recinto;
  const values = [
    usuarios_id,
    nombre,
    telefono,
    email,
    direccion,
    comuna,
    estado,
  ];
  const consulta =
    "INSERT INTO recinto values (DEFAULT, $1, $2, $3, $4, $5, $6, $7)";
  await pool.query(consulta, values);
};

const actualizarRecinto = async (recinto, id) => {
  let { usuarios_id, nombre, telefono, email, direccion, comuna, estado } =
    recinto;
  const values = [
    usuarios_id,
    nombre,
    telefono,
    email,
    direccion,
    comuna,
    estado,
    id,
  ];
  const consulta =
    "UPDATE recinto SET usuarios_id = $1, nombre = $2, telefono = $3, email = $4, direccion = $5, comuna = $6, estado = $7 WHERE id = $8";
  await pool.query(consulta, values);
};

const obtenerRecintosTenant = async (usuarios_id) => {
  const consulta = "SELECT * FROM recinto WHERE usuarios_id = $1";
  const values = [usuarios_id];
  const { rowCount } = await pool.query(consulta, values);
  if (!rowCount) throw { code: 404, message: "No se encontraron recintos" };
};

const obtenerRecintoUser = async (comuna) => {
  const consulta = "SELECT * FROM recinto";
  const values = [comuna];
  const { rowCount } = await pool.query(consulta, values);
  if (!rowCount) throw { code: 404, message: "No se encontraron recintos" };
};

const registrarCancha = async (cancha) => {
  let { usuarios_id, recinto_id, deporte, jugadores, fecha, estado } = cancha;
  const values = [usuarios_id, recinto_id, deporte, jugadores, fecha, estado];
  const consulta =
    "INSERT INTO cancha values (DEFAULT, $1, $2, $3, $4, $5, $6)";
  await pool.query(consulta, values);
};

const actualizarCancha = async (cancha, id) => {
  let { usuarios_id, recinto_id, deporte, jugadores, fecha, estado } = cancha;
  const values = [
    usuarios_id,
    recinto_id,
    deporte,
    jugadores,
    fecha,
    estado,
    id,
  ];
  const consulta =
    "UPDATE cancha SET usuarios_id = $1, recinto_id = $2, deporte = $3, jugadores = $4, fecha = $5, estado = $6 WHERE id = $7";
  await pool.query(consulta, values);
};

const registrarReserva = async (cancha) => {
  let { cancha_id, recinto_id, fecha_inicio, fecha_termino, estado } = reserva;
  const values = [cancha_id, recinto_id, fecha_inicio, fecha_termino, estado];
  const consulta =
    "INSERT INTO reserva values (DEFAULT, $1, $2, $3, $4, $5)";
  await pool.query(consulta, values);
};


module.exports = {
  verificarUsuario,
  registrarUsuario,
  actualizarUsuario,
  registrarRecinto,
  actualizarRecinto,
  obtenerRecintosTenant,
  obtenerRecintoUser,
  registrarCancha,
  actualizarCancha,
  registrarReserva
};