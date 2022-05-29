'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs') //Librería usada para encriptar la contraseña y guardarla en formato codificado

const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    displayName: String,
    password: String,
    singupDate: { type: Date, default: Date.now() },
    lastLogin: Date
})
//Se ejecuta antes de guardar un usuario y tiene next como parámetro para que pueda pasar a la siguiente middleware (hacer el save)
UserSchema.pre('save', function (next) {
    let user = this
    //Si el usuario no ha modificado su contraseña, pasa al siguiente middleware (hacer el save)
    if (!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => { //Genera una cadena aleatora en un tiempo de 10, puede devolver un error o el salt
        if (err) return next(err)

        bcrypt.hash(user.password, salt, null, (err, hash) => { //Encripta la contraseña con el salt generado
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

module.exports = mongoose.model('User', UserSchema); //Exporta el modelo usuario
