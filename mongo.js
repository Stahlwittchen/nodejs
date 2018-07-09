const express = require("express");
const bodyParser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');

const app = express();
const jsonParser = bodyParser.json();
const url = "mongodb://localhost:27017/citiesdb";

app.use(express.static(__dirname + "/public"));

app.get("/cities", function(req, res){

    mongoClient.connect(url, function(err, client){
        client.db("citiesdb").collection("cities").find({}).toArray(function(err, cities){
            res.send(cities)
            client.close();
        });
    });
});

app.get("/cities/:id", function(req, res){
    const id = JSON.parse(req.params.id);
    console.log(mongoose.Types.ObjectId(id))

    mongoClient.connect(url, function(err, client){
        client.db("citiesdb").collection("cities").findOne({_id: mongoose.Types.ObjectId(id)}, function(err, city){
            if(err) return res.status(400).send(err)
            res.send(city)
            client.close();
        });
    });
});

// app.post("/cities", jsonParser, function (req, res) {
//
//     if(!req.body) return res.sendStatus(400);
//
//     const cityName = req.body.name;
//     const cityCountry = req.body.country;
//     const city = {name: cityName, country: cityCountry};
//
//     mongoClient.connect(url, function(err, client){
//         client.db("citiesdb").collection("cities").insertOne(city, function(err, result){
//
//             if(err) return res.status(400).send();
//
//             res.send(city);
//             client.close();
//         });
//     });
// });
//
// app.put("/cities", jsonParser, function(req, res){
//
//     if(!req.body) return res.sendStatus(400);
//     const id = JSON.parse(req.params.id);
//     const cityName = req.body.name;
//     const cityCountry = req.body.country;
//
//     mongoClient.connect(url, function(err, client){
//         client.db("citiesdb").collection("cities").findOneAndUpdate({_id: objectId(id)}, { $set: {country: cityCountry, name: cityName}},
//             {returnOriginal: false },function(err, result){
//
//                 if(err) return res.status(400).send();
//
//                 const city = result.value;
//                 res.send(city);
//                 client.close();
//             });
//     });
// });

module.exports = app;