const express = require('express');
const router = express.Router();
const _ = require('underscore');
const jwt = require('jsonwebtoken');

const  users = require('../data/users');

router.post('/', function (req, res) {
    let user = _.find(users, {email: req.body.email})

    if (user === undefined || user.password !== req.body.password){
        res.status(403).send({success: false, message: "wrong credential"})
    } else {
        let payload = {"sub": user.id, "isActive": user.isActive}
        let token = jwt.sign(payload, "secret", {expiresIn: 100})
        res.send(token);
    }
});

module.exports = router;