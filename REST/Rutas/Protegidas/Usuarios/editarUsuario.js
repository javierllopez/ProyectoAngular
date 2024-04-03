const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../../Datos/db');
const validarToken = require('../../../Lib/validarToken');

const router = express.Router();

// Ruta para editar los datos de un usuario (protegida con token)
router.put('/editarUsuario', validarToken, async (req, res) => {
    const { id, username, password, apellido, nombre, email, sexo, fecha_nacimiento } = req.body;
    const userId = req.user.id; // Obtener el ID del usuario autenticado desde el token

    try {
        // Verificar que el usuario que realiza la solicitud es el mismo que se está editando
        if (userId !== id) {
            return res.status(403).json({ mensaje: 'No tiene permisos para editar este usuario' });
        }

        // Encriptar la nueva contraseña si se proporcionó
        let hashedPassword = password;
        if (password) {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        // Actualizar los datos del usuario en la base de datos
        await pool.query(
            'UPDATE usuarios SET username = ?, password = ?, apellido = ?, nombre = ?, email = ?, sexo = ?, fecha_nacimiento = ? WHERE id = ?',
            [username, hashedPassword, apellido, nombre, email, sexo, fecha_nacimiento, id]
        );

        return res.json({ mensaje: 'Usuario actualizado exitosamente' });
    } catch (error) {
        console.error('Error al editar usuario:', error);
        return res.status(500).json({ mensaje: 'Error al editar usuario' });
    }
});

module.exports = router;
