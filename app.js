const express = require('express');
const app = express();
const _ = require('underscore');
const  users = require('./data/users');
const  products = require('./data/products');

const passport = require('passport');
const jwt = require('jsonwebtoken');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;


app.use(express.static(__dirname));
app.use(express.json());

passport.use(new FacebookStrategy({
        clientID: "FACEBOOK_APP_ID",
        clientSecret: "FACEBOOK_APP_SECRET",
        callbackURL: "http://localhost:3003/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

passport.use(new TwitterStrategy({
        consumerKey: "TWITTER_CONSUMER_KEY",
        consumerSecret: "TWITTER_CONSUMER_SECRET",
        callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, cb) {
        User.findOrCreate({ twitterId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

passport.use(new GoogleStrategy({
        clientID: "GOOGLE_CLIENT_ID",
        clientSecret: "GOOGLE_CLIENT_SECRET",
        callbackURL: "http://www.example.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

app.get('/products', function (req, res) {
    // req.query.items
    res
        .status(200)
        .json(products)
});

app.get('/products/:id', function (req, res) {
    const  product =  _.find(products, {id: req.params.id});
    if (product === undefined){
        res.status(404)
            .json({message: `product with id ${req.params.id} not found`})
    }
    res.json(product);
})

app.get('/products/:id/reviews', function (req, res) {
    const  product =  _.find(products, {id: req.params.id});
    res.json(product.reviews);
})



app.post('/products', function (request, response) {
    if(!request.body) return response.sendStatus(400);
    products.push(request.body);
    response.json(request.body)
});

app.get('/users', checkToken, function (req, res) {
    res
        .status(200)
        .json(users)
});

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

function checkToken (req, res, next) {
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
}

app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

app.get('/auth/twitter',
    passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = app;