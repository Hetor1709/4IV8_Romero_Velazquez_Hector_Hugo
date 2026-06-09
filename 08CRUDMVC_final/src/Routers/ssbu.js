const express = require('express');
const router  = express.Router();
const db      = require('../DB/database');

// ============================================================
// FUNCIÓN DE VALIDACIÓN SSBU
// ============================================================
function validarPersonaje({ nombre, saga, peso }) {
    const errores = [];

    // ---- NOMBRE ----
    if (nombre === undefined || nombre === null || String(nombre).trim() === '') {
        errores.push('El nombre es obligatorio.');
    } else {
        const nombreStr = String(nombre).trim();
        // Solo letras (incluyendo acentos, ñ), espacios y guiones
        if (!/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s\-\.&']+$/.test(nombreStr)) {
            errores.push('El nombre solo puede contener letras, espacios y guiones (sin números ni caracteres especiales).');
        }
        if (nombreStr.length < 2) {
            errores.push('El nombre debe tener al menos 2 caracteres.');
        }
        if (nombreStr.length > 100) {
            errores.push('El nombre no puede superar los 100 caracteres.');
        }
    }

    // ---- SAGA ----
    if (saga === undefined || saga === null || String(saga).trim() === '') {
        errores.push('La saga es obligatoria.');
    } else {
        const sagaStr = String(saga).trim();
        // Solo letras (incluyendo acentos, ñ), espacios y guiones
        if (!/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s\-\.&']+$/.test(sagaStr)) {
            errores.push('La saga solo puede contener letras, espacios y guiones (sin números ni caracteres especiales).');
        }
        if (sagaStr.length < 2) {
            errores.push('La saga debe tener al menos 2 caracteres.');
        }
        if (sagaStr.length > 100) {
            errores.push('La saga no puede superar los 100 caracteres.');
        }
    }

    // ---- PESO ----
    if (peso === undefined || peso === null || String(peso).trim() === '') {
        errores.push('El peso es obligatorio.');
    } else {
        const pesoNum = Number(peso);
        // Debe ser un número válido
        if (isNaN(pesoNum)) {
            errores.push('El peso debe ser un número.');
        } else if (!Number.isFinite(pesoNum)) {
            errores.push('El peso debe ser un número finito.');
        } else if (pesoNum < 0) {
            errores.push('El peso no puede ser negativo.');
        } else if (pesoNum > 9999) {
            errores.push('El peso no puede superar 4 dígitos (máximo 9999).');
        } else {
            // Validar que no tenga más de 4 dígitos en la parte entera
            const parteEntera = Math.floor(Math.abs(pesoNum));
            if (String(parteEntera).length > 4) {
                errores.push('El peso no puede superar 4 dígitos (máximo 9999).');
            }
        }
    }

    return errores;
}

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

        // Validar
        const errores = validarPersonaje({ nombre, saga, peso });
        if (errores.length > 0) {
            return res.status(400).json({ status: 'error', message: errores.join(' '), errores });
        }

        const [result] = await db.execute(
            'INSERT INTO ssbu_personajes (nombre, saga, peso) VALUES (?, ?, ?)',
            [String(nombre).trim(), String(saga).trim(), Number(peso)]
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

        // Validar
        const errores = validarPersonaje({ nombre, saga, peso });
        if (errores.length > 0) {
            return res.status(400).json({ status: 'error', message: errores.join(' '), errores });
        }

        await db.execute(
            'UPDATE ssbu_personajes SET nombre = ?, saga = ?, peso = ? WHERE id = ?',
            [String(nombre).trim(), String(saga).trim(), Number(peso), req.params.id]
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
