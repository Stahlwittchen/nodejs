const express = require('express');
const router = express.Router();

const Cities = require('../models/City');

router
    .get('/', function(req, res) {
        Cities.find({}, function (err, cities) {
            if (err) throw err;
            res.send(cities);
        })
    })
    .post('/', function (req, res, next) {
        if (!req.body) return res.sendStatus(400);

        const newCity = new Cities(req.body);
        newCity.save(function (err) {
            if (err) {
                return next(err);
            }
            console.log('newCity was successfully saved')
            res.json(newCity);
        });
    })
    .get("/:id", function(req, res){
        Cities.findById(req.params.id,  function (err, city) {
            console.log(err, city);
            if (err) throw err;
            res.send(city)
        })
    })
    .delete("/:id", function(req, res){
        if (!req.body) return res.sendStatus(400);
        Cities.findById(req.params.id,  function (err, city) {
            city.remove(function (err) {
                if (err) {
                    return next(err);
                }
                console.log(city + ' was successfully removed');
                res.send(city)
            });

        });
    })
    .put('/:id', function(req, res, next) {
        Cities.findByIdAndUpdate(req.params.id, req.body, function (err, city) {
            if (err) return next(err);
            city.save(function (err) {
                if (!err) {
                    console.log("updated");
                } else {
                    console.log(err);
                }
                return res.send(city);
            });
        });
    });

module.exports = router;