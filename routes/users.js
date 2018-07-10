const express = require('express');
const router = express.Router();
//const users = require('../data/users');

const Users = require('../models/User');

const  Mila = new Users({
    name: "Mila",
    email: "mila@mail.com",
    isActive: true,
    password: "admin"
})

// Mila.save(function () {
//     console.log('Mila was successfully saved')
// });

router.get('/', function(req, res) {
    Users.find({}, function (err, users) {
        if (err) throw err;
        res.send(users);
    })
});

module.exports = router;