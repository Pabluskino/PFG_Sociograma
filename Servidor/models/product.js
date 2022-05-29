'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema; //Esquema de mongoose para crear el modelo

const ProductSchema = Schema({ //Modelo de producto con sus campos
    name: String,
    picture: String,
    price: Number,
    category: {
        type: String,
        enum: ['computers', 'phones', 'accesories'], //Solo puede ser una de estas opciones
    },
    description: String
})

module.exports = mongoose.model('Product', ProductSchema); //Exporta el modelo para que se pueda usar en la aplicación