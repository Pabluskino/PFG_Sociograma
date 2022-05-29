'use strict'

const jwt = require('jwt-simple'); //Importa la librería json web token
const moment = require('moment'); //Librería para el manejo de fechas
const config = require('../config'); //Importa config.js

function createToken(user) {
    const payload = { //Datos que viajan en el cliente y servidor
        sub: user._id, //Id usuario que se crea cuando se almacena el usuario en la base de datos
        iat: moment().unix(), //Fecha creación token (este momento) en formato unix
        exp: moment().add(14, 'days').unix(), //Fecha expiración token (en 14 días) en formato unix
    }

    return jwt.encode(payload, config.SECRET_TOKEN) //Codifica el payload con el SECRET_TOKEN
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => { //resolve si funciona la decodificación y reject si falla
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN) //Decodifica el payload

            if (payload.exp <= moment().unix()) { //Si la fecha de expiración del token es menor o igual a la fecha actual
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                })
            }

            resolve(payload.sub) //Se envía el id del usuario

        }catch (err) {
            reject({
                status: 500,
                message: 'Invalid Token'
            })
        }
    })
    return decoded;
}

module.exports = {
    createToken,
    decodeToken
}