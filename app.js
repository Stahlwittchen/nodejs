const express = require('express');
const app = express();
const _ = require('underscore');
const  users = require('./data/users');
const  products = require('./data/products');

const passport = require('passport');
const jwt = require('jsonwebtoken');

app.use(express.static(__dirname));
app.use(express.json());

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



app.post('/products', function (request, response) {
    if(!request.body) return response.sendStatus(400);
    products.push(request.body);
    response.json(request.body)
});

app.get('/users', checkToken, function (req, res) {
    res
        .status(200)
        .json(users)
});

app.post('/auth', function (req, res) {
    let user = _.find(users, {email: req.body.email})

    if (user === undefined || user.password !== req.body.password){
        res.status(403).send({success: false, message: "wrong credential"})
    } else {
        let payload = {"sub": user.id, "isActive": user.isActive}
        let token = jwt.sign(payload, "secret", {expiresIn: 100})
        res.send(token);
    }
});

function checkToken (req, res, next) {
    let token = req.headers['x-access-token'];
    if(token) {
        jwt.verify(token, 'secret', function (err, decoded) {
            if (err) {
                res.json({success: false, message: 'failed to auth token'})
            } else {
                next();
            }
        })
    } else {
        res.status(403).send({success: false, message: 'no token'})
    }
}

module.exports = app;