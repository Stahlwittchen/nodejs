const express = require('express');
const app = express();
const mongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
mongoClient.connect(url, function(err, client){

    const db = client.db("citiesdb");
    const collection = db.collection("cities");
    let cities = [{
        "name": "Brest",
        "country": "Belarus",
        "capital": false,
        "location": {
            "lat": 52.097621,
            "long": 23.734050
        }
    }];
    if(err) return console.log(err);

    collection.insertMany(cities, function(err, results){

        if(err){
            return console.log(err);
        }

        console.log(results.ops);
        client.close();
    });
});


module.exports = app;