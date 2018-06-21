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

app.post('/employees', express.json(), function (request, response) {
    //console.log(request.user);
    //console.log(request.body);
    //users.push(request.body);
    //response.send(`${request.body.userName} - ${request.body.userAge}`);
});

app.get('/users', function (req, res) {
    res
        .status(200)
        .json(users)
});

module.exports = app;