const express = require('express');
const router = express.Router();
const users = require('../data/users');
const _ = require('underscore');

router.get('/', function(req, res) {
    res
        .status(200)
        .json(users)
});

/*function checkToken (req, res, next) {
    let token = req.headers['x-access-token'];
    if(token) {
        jwt.verify(token, 'secret', function (err, decoded) {
            if (err) {
                res.json({success: false, message: 'failed to auth token'})
            } else {
                next();
            }
        })
    } else {
        res.status(403).send({success: false, message: 'no token'})
    }
}*/
module.exports = router;