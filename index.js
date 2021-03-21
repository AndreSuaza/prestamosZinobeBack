const express = require('express');
require('dotenv').config();
var cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

//Configurar Cors
app.use(cors());

//Lectura Body
app.use( express.json() );

//Base de datos
dbConnection();

//Runtas
app.use('/api/users', require('./routes/users'));



app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo 2');
} )