'use strict';

const express = require('express'); //Lee de node_modules express y lo importa
const bodyParser = require('body-parser'); /*Permite parsear el cuerpo de la petición de tipo POST para poder tratar los
                                            datos en node y en la base de datos.
                                            Funciona como middleware que son capas de express que se le van añadiendo, que 
                                            en cada petición va a pasar por esas capas*/
const app = express(); //Crea el servidor llamando a express
const cors = require('cors');
const api = require('./routes') //Referencia al index.js de routes

app.use(bodyParser.urlencoded({ extended: false })); //Añade el middleware
app.use(bodyParser.json()); //Para permitir mensajes con formato json
app.use(cors());
app.use('/api', api); //Para que las rutas de routes empiecen por /api

module.exports = app;