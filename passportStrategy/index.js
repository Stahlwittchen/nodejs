const passport = require('passport');

const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

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
        callbackURL: "http://localhost:3003/auth/twitter/callback"
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
        callbackURL: "http://localhost:3003/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

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

module.exports = { };