const express = require('express');
const router = express.Router();
const db = require('../DB/database');

// ============================================================
// GET /api/ssbu/personajes — Listar todos
// ============================================================
router.get('/personajes', async (req, res) => {
    try {
        const [data] = await db.execute(
            'SELECT * FROM ssbu_personajes ORDER BY id ASC'
        );
        res.json({ status: 'success', data, count: data.length });
    } catch (error) {
        console.log('ERROR SSBU GET personajes');
        console.log(error);
        res.status(500).json({ status: 'error', message: error.message, error });
    }
});

// ============================================================
// GET /api/ssbu/personajes/:id — Obtener uno
// ============================================================
router.get('/personajes/:id', async (req, res) => {
    try {
        const [data] = await db.execute(
            'SELECT * FROM ssbu_personajes WHERE id = ?',
            [req.params.id]
        );
        if (!data.length) {
            return res.status(404).json({ status: 'error', message: 'Personaje no encontrado' });
        }
        res.json({ status: 'success', data: data[0] });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// ============================================================
// POST /api/ssbu/personajes — Crear
// ============================================================
router.post('/personajes', async (req, res) => {
    try {
        const { nombre, saga, peso } = req.body;
        const [result] = await db.execute(
            'INSERT INTO ssbu_personajes (nombre, saga, peso) VALUES (?, ?, ?)',
            [nombre, saga, peso]
        );
        res.status(201).json({ status: 'success', id: result.insertId });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// ============================================================
// PUT /api/ssbu/personajes/:id — Actualizar
// ============================================================
router.put('/personajes/:id', async (req, res) => {
    try {
        const { nombre, saga, peso } = req.body;
        await db.execute(
            'UPDATE ssbu_personajes SET nombre = ?, saga = ?, peso = ? WHERE id = ?',
            [nombre, saga, peso, req.params.id]
        );
        res.json({ status: 'success' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// ============================================================
// DELETE /api/ssbu/personajes/:id — Eliminar
// ============================================================
router.delete('/personajes/:id', async (req, res) => {
    try {
        await db.execute(
            'DELETE FROM ssbu_personajes WHERE id = ?',
            [req.params.id]
        );
        res.json({ status: 'success' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;
