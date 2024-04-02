const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../Datos/db');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/registrarUsuario', async (req, res) => {
    const { username, password, apellido, nombre, email, sexo, fecha_nacimiento } = req.body;

    try {
        // Generar una clave secreta única para encriptar la contraseña
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        // Encriptar la contraseña con la clave secreta generada
        const hashedPassword = await bcrypt.hash(password, salt);

        // Verificar si el usuario ya existe en la base de datos
        const [existingUser] = await pool.query('SELECT * FROM usuarios WHERE username = ?', [username]);

        if (existingUser.length > 0) {
            return res.status(400).json({ mensaje: 'El nombre de usuario ya está en uso' });
        }

        // Insertar el nuevo usuario en la base de datos
        const result = await pool.query(
            'INSERT INTO usuarios (username, password, apellido, nombre, email, sexo, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [username, hashedPassword, apellido, nombre, email, sexo, fecha_nacimiento]
        );

        res.status(201).json({ mensaje: 'Usuario registrado exitosamente', id: result.insertId });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ mensaje: 'Error al registrar usuario' });
    }
});

module.exports = router;
