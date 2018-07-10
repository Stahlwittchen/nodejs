const express = require('express');
const app = express();
const mongoose = require('mongoose');

const auth = require('./routes/auth');
const products = require('./routes/products');
const users = require('./routes/users');
const cities = require('./routes/cities');
const check = require('./check');

const url = 'mongodb://localhost:27017/citiesdb';
mongoose.connect(url);

app.use(express.static(__dirname));
app.use(express.json());
app.use('/auth', auth);
app.use('/products', products);
app.use('/users', users);
app.use('/cities', cities);

module.exports = app;