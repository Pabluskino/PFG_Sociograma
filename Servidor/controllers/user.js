'use strict'

const mongoose = require('mongoose');
const User = require('../models/user'); //Importa el modelo usuario
const service = require('../service'); //Importa el index.js de service
const bcrypt = require('bcryptjs');

function signUp(req, res) {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    })

    user.save((err) => {
        if(err) res.status(500).send({ message: `Error al crear el usuario ${err}` })

        return res.status(200).send({ token: service.createToken(user) }) //Envía el token creado
    })
}

async function signIn(req, res) {
    await User.findOne({ email: req.body.email }) //Busca el usuario con el email del cuerpo de la petición
      .then((user) => { //Si funciona la petición devuelve el usuario
        if (!user) //Si no existe el usuario
          return res
            .status(404)
            .send({ message: "El usuario no está registrado" });
  
        const password_verification = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (password_verification) {
          res.status(200).send({
            message: "Te has logeado correctamentes",
            token: service.createToken(user), //Envía el token creado
          });
        } else {
          res.status(500).send({ message: "Email o Contraseña incorrectos" });
        }
      })
      .catch((err) => { //Si falla
        return res
          .status(500)
          .send({ message: `Error al realizar la petición ${err}` });
      });
  }

module.exports = {
    signUp,
    signIn
}