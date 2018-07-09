const express = require("express");
const app = express();

const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/citiesdb';
const City = require('./models/City')

const  Brest = new City({
        name: "Brest",
            country: "Belarus",
            capital: false,
            location: {
                lat: 52.097621,
                long: 23.734050
            }
        })

// Brest.save(function(err) {
//     if (err) throw err;
//
//     console.log('City saved successfully!');
// });

// City.find({}, function (err, cities) {
//     if (err) throw err;
//
//     console.log(cities);
// })
// City.find({ capital: true }, function(err, user) {
//     if (err) throw err;
//
//     // object of the user
//     console.log(user);
// });
app.get("/cities", function(req, res){
    mongoose.connect(url).then(
        City.find({}, function (err, cities) {
            if (err) throw err;
            res.send(cities)
            //console.log(cities);
        })
    );
});

app.get("/cities/:id", function(req, res){
    const id = JSON.parse(req.params.id);
    mongoose.connect(url, { useNewUrlParser: true }).then(
        () => {
            City.findOne({ _id: mongoose.Types.ObjectId(id)}, function (err, city) {
                console.log(city);
                if (err) throw err;
                res.send(city)
            })
        },
        err => {
            throw err;
        }
    );
});

module.exports = app;