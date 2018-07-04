const express = require('express');
const app = express();

const auth = require('./routes/auth');
const products = require('./routes/products');
const users = require('./routes/users');
const check = require('./check');
//const routes = require('./routes');

app.use(express.static(__dirname));
app.use(express.json());
app.use('/auth', auth);
app.use('/products', check, products);
app.use('/users',check, users);

module.exports = app;