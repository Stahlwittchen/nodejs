const express = require('express');
const router = express.Router();
const  products = require('../data/products');
const _ = require('underscore');

router.get('/', function(req, res) {
    const  product =  _.find(products, {id: req.params.id});
    if (product === undefined){
        res.status(404)
            .json({message: `product with id ${req.params.id} not found test`})
    }
    res.json(product);
});

router.get('/:id', function(req, res) {
    const  product =  _.find(products, {id: req.params.id});
    if (product === undefined){
        res.status(404)
            .json({message: `product with id ${req.params.id} not found`})
    }
    res.json(product);
});

router.get('/:id/reviews', function(req, res) {
    const  product =  _.find(products, {id: req.params.id});
    if (product === undefined){
        res.status(404)
            .json({message: `product with id ${req.params.id} not found`})
    }
    res.json(product.reviews);
});

module.exports = router;