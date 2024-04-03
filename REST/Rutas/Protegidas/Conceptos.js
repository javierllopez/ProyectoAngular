const express = require('express');
const validarToken = require('../../Lib/validarToken');
const pool = require('../../Datos/db');

const router = express.Router();

// Ruta para agregar un nuevo concepto (protegida con token)
router.post('/agregarConcepto', validarToken, async (req, res) => {
    const { descripcion } = req.body;

    try {
        // Verificar si el concepto ya existe en la base de datos
        const [existingConcept] = await pool.query('SELECT * FROM conceptos WHERE Descripcion = ?', [descripcion]);

        if (existingConcept.length > 0) {
            return res.status(400).json({ mensaje: 'El concepto ya existe' });
        }

        // Insertar el nuevo concepto en la base de datos
        const result = await pool.query('INSERT INTO conceptos (Descripcion) VALUES (?)', [descripcion]);

        res.status(201).json({ mensaje: 'Concepto agregado exitosamente', id: result.insertId });
    } catch (error) {
        console.error('Error al agregar concepto:', error);
        res.status(500).json({ mensaje: 'Error al agregar concepto' });
    }
});

// Ruta para modificar un concepto existente (protegida con token)
router.put('/modificarConcepto/:id', validarToken, async (req, res) => {
    const id = req.params.id;
    const { descripcion } = req.body;

    try {
        // Verificar si el concepto a modificar existe en la base de datos
        const [existingConcept] = await pool.query('SELECT * FROM conceptos WHERE Id = ?', [id]);

        if (existingConcept.length === 0) {
            return res.status(404).json({ mensaje: 'Concepto no encontrado' });
        }

        // Actualizar el concepto en la base de datos
        await pool.query('UPDATE conceptos SET Descripcion = ? WHERE Id = ?', [descripcion, id]);

        res.json({ mensaje: 'Concepto modificado exitosamente' });
    } catch (error) {
        console.error('Error al modificar concepto:', error);
        res.status(500).json({ mensaje: 'Error al modificar concepto' });
    }
});

// Ruta para eliminar un concepto (protegida con token)
router.delete('/eliminarConcepto/:id', validarToken, async (req, res) => {
    const id = req.params.id;

    try {
        // Verificar si el concepto a eliminar existe en la base de datos
        const [existingConcept] = await pool.query('SELECT * FROM conceptos WHERE Id = ?', [id]);

        if (existingConcept.length === 0) {
            return res.status(404).json({ mensaje: 'Concepto no encontrado' });
        }

        // Eliminar el concepto de la base de datos
        await pool.query('DELETE FROM conceptos WHERE Id = ?', [id]);

        res.json({ mensaje: 'Concepto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar concepto:', error);
        res.status(500).json({ mensaje: 'Error al eliminar concepto' });
    }
});

// Ruta para listar todos los conceptos (protegida con token)
router.get('/listarConceptos', validarToken, async (req, res) => {
    try {
        // Obtener todos los conceptos de la base de datos
        const [conceptos] = await pool.query('SELECT * FROM conceptos');

        res.json(conceptos);
    } catch (error) {
        console.error('Error al listar conceptos:', error);
        res.status(500).json({ mensaje: 'Error al listar conceptos' });
    }
});

// Ruta para obtener un concepto por su ID (protegida con token)
router.get('/obtenerConcepto/:id', validarToken, async (req, res) => {
    const id = req.params.id;

    try {
        // Obtener el concepto por su ID de la base de datos
        const [concepto] = await pool.query('SELECT * FROM conceptos WHERE Id = ?', [id]);

        if (concepto.length === 0) {
            return res.status(404).json({ mensaje: 'Concepto no encontrado' });
        }

        res.json(concepto[0]);
    } catch (error) {
        console.error('Error al obtener concepto:', error);
        res.status(500).json({ mensaje: 'Error al obtener concepto' });
    }
});

module.exports = router;
