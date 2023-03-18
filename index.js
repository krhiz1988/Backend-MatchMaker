require('dotenv').config();
const app = require('./src/app');
const port = process.env.PGPORT || process.env.DB_PORT;
app.listen(port, () => console.log(`La aplicacion fue exitosamente desplegada en el puerto:${port}`))

