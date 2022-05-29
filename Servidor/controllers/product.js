'use strict';

const Product = require('../models/product') //Para usar el modelo de producto

function getProduct(req, res) {
    let productId = req.params.productId; //El id de producto que se pone como parámetro de la url
    //Usa la función findById con el paŕametro de la id y puede devolver un error o el producto
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` });
        if (!product) return res.status(404).send({ message: `El producto no existe` })

        res.status(200).send({ product });
    })
}

function getProducts(req, res) {
    Product.find({}, (err, products) => { //Usa la función find que puede devolver un error o un array de productos
        if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` });
        if (!products) return res.status(404).send({ message: `No existen productos` });

        res.send(200, { products })
    })
}

function saveProduct(req, res) {
    console.log('POST /api/product');
    console.log(req.body);
    //Crea un producto con los valores de sus atributos en el body de la petición
    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;

    Product.save((err, productStored) => { // Guarda el producto en la base de datos, puede devolver error o el producto
        if (err) res.status(500).send({ message: `Error al salvar en la base de datos ${err}` });

        res.status(200).send({ product: productStored })
    });
}

function updateProduct(req, res) {
    let productId = req.params.productId;
    let update = req.body; //Los datos del producto a actualizar que están en el body
    //Función que busca Un producto y lo actualiza cogiendo el el y los datos actualizados, devuelve un error o el producto
    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) res.status(500).send({ message: `Error al actualizar el producto ${err}` });

        res.status(200).send({ product: productUpdated });
    })
}

function deleteProduct(req, res) {
    let productId = req.params.productId;

    Product.findById(productId, (err) => {
        if(err) res.status(500).send({message: `Error al borrar el producto ${err}`});

        Product.remove(err => { //Función que borra el producto, puede devolver error
            if(err) res.status(500).send({message: `Error al borrar el producto ${err}`});
            res.status(200).send({message: `El producto ha sido eliminado`})
        })
    })
}

module.exports = { //Se exportan las funciones
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}