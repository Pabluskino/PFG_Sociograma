module.exports = {
    port: process.env.PORT || 3001, //El puerto puede ser una variable de entorno o 3001
    db: process.env.MONGODB || 'mongodb://localhost:27017', //Dirección de la base de datos
    SECRET_TOKEN: 'miclavedetokens'
}