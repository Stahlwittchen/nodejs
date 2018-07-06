const express = require('express');
const router = express.Router();
//const users = require('../data/users');

const db = require("../node_modules/.bin/models");

router.get('/', function(req, res) {
    db.User.findAll({raw:true})
        .then(users => {
            res.send(users)
        })
});

module.exports = router;