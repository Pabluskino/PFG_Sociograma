'use strict';

const express = require('express');
const ProductCtrl = require('../controllers/product'); //Referencia al controlador de producto con sus funciones
const userCtrl = require('../controllers/user'); //Importa los controladores de usuario
const auth = require('../middlewares/auth'); //Importa el middleware de autenticación (auth.js)
const api = express.Router();

api.get('/product', ProductCtrl.getProducts);
api.get('/product/:productId', ProductCtrl.getProduct);
api.post('/product', ProductCtrl.saveProduct);
api.put('/product/:productId', ProductCtrl.updateProduct);
api.delete('/product/:productId', ProductCtrl.deleteProduct);
api.post('/signup', userCtrl.signUp);
api.post('/signin', userCtrl.signIn);
/*Comprueba primero si estamos autenticados para pasar a la función (como auth.js solo exporta una función no hace falta 
ponerla)*/
api.get('/private', auth, function(req, res){
    res.status(200).send({message: 'Tienes acceso'})
})

module.exports = api;