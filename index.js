const express = require('express');
require('dotenv').config();
var cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

//Configurar Cors
app.use(cors());

//Base de datos
dbConnection();

//Runtas
app.get( '/', (req, res) => {
    res.json({ ok:true, msg: 'hola mundo' })
});

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo 2');
} )