const request = require("supertest");
const app = require("../app");



describe("Validaciones a rutas definidas", () => {
  it("Validar Inicio Sesión ", async () => {
    const email = 'prueba123@mail.cl';
    const password = '123';

    const resultado = await request(app).post("/login").send({ email, password}) 
    expect(resultado.statusCode).toBe(200);
  });

  it("Validar registro de usuario ", async () => {
    const usuario = {
      id: 5,
      nombre: "Usuario",
      apellido_paterno: "Prueba",
      rut: "11.111.111-1",
      email: "usuario.prueba@test.cl",
      telefono: "123456789",
      direccion: "Los Tulipanes 15",
      comuna: "Villa Alemana",
      region: "Valparaiso",
      tipo_user: 0,
      password: "123123",
    };
    const resultado = await request(app).post("/registro").send(usuario)
    expect(resultado.statusCode).toBe(201);
  });

  it("Validar actualizar usuario", async () => {
    const usuario = {
      id: 8,
      nombre: "Usuario",
      apellido_paterno: "Prueba Editado",
      rut: "11.111.111-1",
      email: "usuario.test@prueba.cl",
      telefono: "987654321",
      direccion: "Las acacias 20",
      comuna: "Villa Alemana",
      region: "Valparaiso",
      tipo_user: 0,
      password: "123123",
    };
    const resultado = await request(app)
      .put(`/usuario/${usuario.id}`)
      .send(usuario)
    expect(resultado.statusCode).toBe(201);
  });

  it("Validar registro del recinto ", async () => {
    const recinto = {
      id: 1,
      usuarios_id: 8,
      nombre: "Recinto de prueba",
      telefono: "123456789",
      email: "recinto.prueba@test.cl",
      direccion: "San Enrique 15",
      comuna: "Villa Alemana",
      estado: true,
    };
    const resultado = await request(app)
      .post("/registro/recinto")
      .send(recinto)
    expect(resultado.statusCode).toBe(201);
  });

  it("Validar actualizar recinto", async () => {
    const recinto = {
      id: 11,
      usuarios_id: 8,
      nombre: "Recinto de prueba editado",
      telefono: "123456789",
      email: "recinto.test.editado@test.cl",
      direccion: "San Enrique 15",
      comuna: "Villa Alemana",
      estado: false,
    };
    const id_recinto = 11;
    const resultado = await request(app)
      .put(`/recinto/${id_recinto}`)
      .send(recinto);
    expect(resultado.statusCode).toBe(201);
  });
});
