const express = require('express');
const router = express.Router();
const Products = require('../models/Product');

const  corn = new Products({
    title: "Some product",
    price: "9.99$",
    availability: true,
    reviews: "some text. More test for god of test! =)"
})

router.get('/', function(req, res) {
    Products.find({}, function (err, products) {
        if (err) throw err;
        // corn.save(function () {
        //     console.log('Corn was successfully saved')
        // });
        res.send(products);
    })
});
router.get("/:id", function(req, res){
    Products.findById(req.params.id,  function (err, product) {
        console.log(err, product);
        if (err) throw err;
        res.send(product)
    })
    // Products.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, product) {
    //     corn.update(function () {
    //         console.log('Corn was successfully updated')
    //     });
    //     if (err) return res.status(500).send(err);
    //     res.send(product)
    // })
    // Products.findByIdAndRemove(req.params.id,  function (err, product) {
    //     corn.remove(function () {
    //         console.log('Corn was successfully removed')
    //     });
    //     if (err) throw err;
    //     res.send(product.name)
    // })
});

router.get("/:id/reviews", function(req, res){
    Products.findById(req.params.id,  function (err, product) {
        console.log(err, product);
        if (err) throw err;
        res.send(product.reviews)
    });
});

module.exports = router;