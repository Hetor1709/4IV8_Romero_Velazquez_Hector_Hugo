const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

//archivos estaticos
app.use(express.static('public'));

//conexion bd
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'pnt_practica1'
});

//ruta de prueba
app.get('/api', (req, res) => {
    res.json({ mensaje: 'Servidor funcionando' });
});

//iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});