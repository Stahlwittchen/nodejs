const express = require('express');
const router = express.Router();

const Users = require('../models/User');

router
    .get('/', function(req, res, next) {
        Users.find({}, function (err, users) {
            if (err) return next(err);
            res.send(users);
        })
    })
    .post('/', function (req, res, next) {
        if (!req.body) return res.sendStatus(400);

        const newUser = new Users(req.body);
        newUser.save(function (err) {
            if (err) {
                return next(err);
            }
            console.log('newUser was successfully saved')
            res.json(newUser);
        });
    })
    .delete("/:id", function(req, res, next){
        if (!req.body) return res.sendStatus(400);
        Users.findById(req.params.id,  function (err, user) {
            user.remove(function (err) {
                if (err) {
                    return next(err);
                }
                console.log(user + ' was successfully removed');
                res.send(user)
            });

        });
    })
    .put('/:id', function(req, res, next) {
        Users.findById(req.params.id, function (err, user) {
            if (err) return next(err);
            user.set(req.body);
            user.save(function (err) {
                if (!err) {
                    console.log("updated");
                    return res.send(user);
                } else {
                    console.log(err);
                }
            });
        });
    });
module.exports = router;