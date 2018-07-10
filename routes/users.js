const express = require('express');
const router = express.Router();
const assert = require('assert');
//const users = require('../data/users');

const Users = require('../models/User');

const  Mila = new Users({
    name: "Mila",
    email: "mila@mail.com",
    isActive: true,
    password: "admin"
})


const  Val = new Users({
    name: "Mila",
    email: "error@mail.com",
    isActive: false,
    password: "error"
})


const  Carl = new Users({
    name: "Carl",
    email: "watsup@mail.com",
    isActive: false,
    password: "carlito"
})

// Mila.save(function () {
//     console.log('Mila was successfully saved')
// });


router.get('/', function(req, res) {
    Users.find({}, function (err, users) {
          assert.notStrictEqual( Val.name, Mila.name, 'такое имя уже есть');
        function add (a, b) {
            return a + b;
        }

        const expected = add(1,2);
        assert( expected === 4, 'one plus two is three');

        if (err) throw err;
        res.send(users);
    })
});

module.exports = router;