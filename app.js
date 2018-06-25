const express = require('express');
const app = express();
const _ = require('underscore');
const  users = require('./data/users');
const  products = require('./data/products');

app.get('/products', function (req, res) {
    // req.query.items
    res
        .status(200)
        .json(products)
});

app.get('/products/:id', function (req, res) {
    const  product =  _.find(products, {id: req.params.id});
    if (product === undefined){
        res.status(404)
            .json({message: `product with id ${req.params.id} not found`})
    }
    res.json(product);
})

app.get('/products/:id/reviews', function (req, res) {
    const  product =  _.find(products, {id: req.params.id});
    res.json(product.reviews);
})

app.use(express.static(__dirname));

app.post('/products', express.json(), function (request, response) {
    if(!request.body) return response.sendStatus(400);
    products.push(request.body);
    response.json(request.body)
});

app.get('/users', function (req, res) {
    res
        .status(200)
        .json(users)
});

module.exports = app;