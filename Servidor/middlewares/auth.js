'use strict'

const services = require('../service');
/*Comprueba si el usuario está autenticado, como es un middleware se pone next para que pase la ejecución de la ruta al 
controlador*/
function isAuth (req, res, next){
    if(!req.headers.authorization) { //Si en las cabeceras de la petición no hay un campo authorization
        return res.status(403).send({message: 'No tienes autorización'});
    }
    //authorization vale "bearer TOKEN" y se divide por espacio cogiendo el segundo elemento
    const token = req.headers.authorization.split(" ")[1];

    services.decodeToken(token)
        .then(response => {
            req.user = response //El usuario es el id
            next() //Pasa al siguiente middleware o controlador
        })
        .catch(response => {
            res.status(response.status);
        })
}

module.exports = isAuth;