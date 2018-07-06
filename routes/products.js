const express = require('express');
const router = express.Router();
//const products = require('../data/products');
const _ = require('underscore');
const db = require("../node_modules/.bin/models");

router.get('/', function(req, res) {
    db.Product.findAll({raw:true})
        .then(products => {
            if (products === undefined){
                res.status(404)
                    .json({message: `products not found`})
            };
            res.send(products)
        })
});

router.post('/', function (req, res) {
    if(!req.body) return res.sendStatus(400);
    products.push(req.body);
    res.json(req.body)
});

router.get('/:id', function(req, res) {
    // const  product =  _.find(products, {id: req.params.id});
    // if (product === undefined){
    //     res.status(404)
    //         .json({message: `product with id ${req.params.id} not found`})
    // }
    // res.json(product);
    db.Product.findById(req.params.id)
        .then(products => {
            res.send(products)
        })
});

router.get('/:id/reviews', function(req, res) {
    db.Product.findById(req.params.id)
        .then(products => {
            const review = products["name"];
            res.send(review)
        })
});

module.exports = router;