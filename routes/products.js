const express = require('express');
const router = express.Router();
const Products = require('../models/Product');

router
    .get('/', function(req, res, next) {
        Products.find({}, function (err, products) {
            if (err) return next(err);
            res.send(products);
        })
    })
    .post('/', function (req, res, next) {
        if (!req.body) return res.sendStatus(400);

        const corn = new Products(req.body);
        corn.save(function (err) {
            if (err) {
                return next(err);
            }
            console.log('Corn was successfully saved')
            res.json(corn);
        });
    });

router
    .get("/:id", function(req, res, next){
        Products.findById(req.params.id,  function (err, product) {
            if (err) return next(err);
            res.send(product)
        })
    })
    .delete("/:id", function(req, res, next){
        if (!req.body) return res.sendStatus(400);
        Products.findById(req.params.id,  function (err, product) {
            product.remove(function (err) {
                if (err) {
                    return next(err);
                }
                console.log('Corn was successfully removed');
                res.send(product)
            });

        });
    })
    .put('/:id', function(req, res, next) {
        Products.findById(req.params.id, function (err, product) {
            if (err) return next(err);
            product.set(req.body);
            product.save(function (err) {
                if (!err) {
                    console.log("updated");
                    return res.send(product);
                } else {
                    console.log(err);
                }

            });
        });
    });

router.get("/:id/reviews", function(req, res, next){
    Products.findById(req.params.id,  function (err, product) {
        console.log(err, product);
        if (err) return next(err);
        res.send(product.reviews)
    });
});

module.exports = router;