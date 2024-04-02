const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const loginRouter = require('./Rutas/login');

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());

// Rutas
app.use('/login', loginRouter);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
