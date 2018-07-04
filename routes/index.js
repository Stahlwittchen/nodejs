const express = require('express');
const app = express();
const _ = require('underscore');
const  users = require('../data/users');
const  products = require('../data/products');
const jwt = require('jsonwebtoken');


app.post('/auth', function (req, res) {
    let user = _.find(users, {email: req.body.email})

    if (user === undefined || user.password !== req.body.password){
        res.status(403).send({success: false, message: "wrong credential"})
    } else {
        let payload = {"sub": user.id, "isActive": user.isActive}
        let token = jwt.sign(payload, "secret", {expiresIn: 100})
        res.send(token);
    }
});

module.exports = app;