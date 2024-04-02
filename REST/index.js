const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const loginRouter = require('./Rutas/login');
const registrarUsuarioRouter = require('./Rutas/registrarUsuario');

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());

// Rutas
app.use('/login', loginRouter);
app.use('/registrarUsuario',registrarUsuarioRouter);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
