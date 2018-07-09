const express = require('express');
const app = express();
const mongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
mongoClient.connect(url, function(err, client){

    const db = client.db("citiesdb");
    const collection = db.collection("cities");
    const query = {};
    const cursor = collection.find(query);
    let cities = [
        {
            "name": "Brest",
            "country": "Belarus",
            "capital": false,
            "location": {
                "lat": 52.097621,
                "long": 23.734050
            }
        }, {
            "name": "Minsk",
            "country": "Belarus",
            "capital": true,
            "location": {
                "lat": 53.9,
                "long": 27.56667
            }
        }, {
            "name": "Hrodna",
            "country": "Belarus",
            "capital": false,
            "location": {
                "lat": 53.6884,
                "long": 23.8258
            }
        },{
            "name": "Gomel",
            "country": "Belarus",
            "capital": false,
            "location": {
                "lat": 52.4345,
                "long": 30.9754
            }
        }

        ];
    // if(err) return console.log(err);
    //
    // collection.insertMany(cities, function(err, results){
    //
    //     if(err){
    //         return console.log(err);
    //     }
    //
    //     console.log(results.ops);
    //     client.close();
    // });
    collection.count(function (err, count) {
        const random = Math.floor(Math.random()*count);
        cursor.sort({_id : -1});
        cursor.skip(random);
        cursor.limit(1);
        cursor.each(function(err, doc) {
            if(err) throw err;
            if(doc == null) {
                return client.close();
            }
            console.dir(doc);
        });
    })
});


module.exports = app;