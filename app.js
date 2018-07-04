const express = require('express');
const app = express();
const products = require('./routes/products')
const users = require('./routes/users')
//const routes = require('./routes');
//const auth = require('./auth');


app.use(express.static(__dirname));
app.use(express.json());
app.use('/products', products);
app.use('/users', users);
module.exports = app;