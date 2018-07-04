const express = require('express');
const router = express.Router();
const users = require('../data/users');

router.get('/', function(req, res) {
    if (users === undefined){
        res.status(404)
            .json({message: `users not found`})
    };
    res
        .status(200)
        .json(users)
});

module.exports = router;