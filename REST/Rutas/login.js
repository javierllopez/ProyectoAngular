const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../Datos/db'); // Importar la conexión desde db.js

const router = express.Router();

// Endpoint para el login
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Consulta a la base de datos para obtener el usuario por nombre
        const [rows, fields] = await pool.query('SELECT * FROM usuarios WHERE username = ?', [username]);

        if (rows.length > 0) {
            const user = rows[0];

            // Verificar si la cuenta está bloqueada
            if (user.bloqueado_hasta && new Date() < new Date(user.bloqueado_hasta)) {
                return res.status(403).json({ mensaje: 'Cuenta bloqueada. Intente nuevamente más tarde.' });
            }

            // Verificar la contraseña con bcrypt
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                // Restablecer el contador de intentos fallidos
                await pool.query('UPDATE usuarios SET intentos_fallidos = 0 WHERE id = ?', [user.id]);

                // Generar y enviar el token JWT
                const token = jwt.sign({ id: user.id, username: user.username }, 'secretoJWT', { expiresIn: '1h' });
                res.json({ token });
            } else {
                // Incrementar el contador de intentos fallidos y bloquear la cuenta si es necesario
                await pool.query('UPDATE usuarios SET intentos_fallidos = intentos_fallidos + 1 WHERE id = ?', [user.id]);

                if (user.intentos_fallidos >= 4) {
                    const bloqueadoHasta = new Date();
                    bloqueadoHasta.setMinutes(bloqueadoHasta.getMinutes() + 10); // Bloqueo por 10 minutos
                    await pool.query('UPDATE usuarios SET bloqueado_hasta = ? WHERE id = ?', [bloqueadoHasta, user.id]);
                }

                res.status(401).json({ mensaje: 'Credenciales inválidas' });
            }
        } else {
            res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
});

module.exports = router;
