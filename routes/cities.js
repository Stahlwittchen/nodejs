const express = require('express');
const router = express.Router();

const Cities = require('../models/City');

const  Brest = new Cities({
    name: "Brest",
    country: "Belarus",
    capital: false,
    location: {
        lat: 52.097621,
        long: 23.734050
    }
})

const  Cologne = new Cities({
    name: "Cologne",
    country: "Germany",
    capital: false,
    location: {
        lat: null,
        long: null
    }
})

router.get("/", function(req, res){

    Cities.find({}, function (err, cities) {
        if (err) throw err;
        res.send(cities);
    })

});

router.get("/:id", function(req, res){
    Cities.findById(req.params.id,  function (err, city) {
        console.log(err, city);
        if (err) throw err;
        res.send(city)
    })
});

router.get("/:id/name", function(req, res){
    Cities.findById(req.params.id,  function (err, city) {
        console.log(err, city);
        if (err) throw err;
        res.send(city.name)
    })
});

module.exports = router;