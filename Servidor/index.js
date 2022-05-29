'use strict';

const mongoose = require('mongoose'); //Importa mongo
const app = require('./app'); //Referencia a app.js que es el servidor
const config = require('./config'); //Referencia a la configuración de config.js

mongoose.connect(config.db , (err, res) => { //Conexión a la base de datos (mongodb debe estar corriendo para que funcione)
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    };
    console.log('Conexión a la base de datos establecida');
    app.listen(config.port, () => { //El servidor se conecta al puerto definido en config
        console.log(`API REST corriendo en http//localhost:${config.port}`)
    })
})

