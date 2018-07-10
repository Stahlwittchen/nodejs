const express = require("express");
const app = express();
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/citiesdb';
const City = require('./models/City');
mongoose.connect(url);

const  Brest = new City({
        name: "Brest",
            country: "Belarus",
            capital: false,
            location: {
                lat: 52.097621,
                long: 23.734050
            }
        })

const  Cologne = new City({
    name: "Cologne",
    country: "Germany",
    capital: false,
    location: {
        lat: null,
        long: null
    }
})

app.get("/cities", function(req, res){

        City.find({}, function (err, cities) {
            if (err) throw err;
            res.send(cities);
        })

});

app.get("/cities/:id", function(req, res){
    City.findById(req.params.id,  function (err, city) {
        console.log(err, city);
        if (err) throw err;
        res.send(city)
    })
});

module.exports = app;