const express = require('express');
const router = express.Router();
const Products = require('../models/Product');

router
    .get('/', function(req, res) {
        Products.find({}, function (err, products) {
            if (err) throw err;
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
    .get("/:id", function(req, res){
        Products.findById(req.params.id,  function (err, product) {
            if (err) throw err;
            res.send(product)
        })
    })
    .delete("/:id", function(req, res){
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
        Products.findByIdAndUpdate(req.params.id, req.body, function (err, product) {
            if (err) return next(err);
            product.save(function (err) {
                if (!err) {
                    console.log("updated");
                } else {
                    console.log(err);
                }
                return res.send(product);
            });
        });
    });

router.get("/:id/reviews", function(req, res){
    Products.findById(req.params.id,  function (err, product) {
        console.log(err, product);
        if (err) throw err;
        res.send(product.reviews)
    });
});

module.exports = router;