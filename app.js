const express = require('express');
const app = express();

const auth = require('./routes/auth');
const products = require('./routes/products');
const users = require('./routes/users');
const cities = require('./routes/cities');
const check = require('./check');
const swaggerUi =  require('swagger-ui-express');
const swaggerDocument =  require('./swagger/swagger.json');

app.use(express.static(__dirname));
app.use(express.json());
app.use('/auth', auth);
app.use('/products', products);
app.use('/users', users);
app.use('/cities', cities);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports = app;