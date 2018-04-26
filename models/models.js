//common js
const User = require('./user');
//const Den = new User("Max");
//Den.hello();

const Product = require('./product');
//const product = new pr('Product module')
//product.show();

//ES modules
//import User from './user';
const user = new User('User module');
user.hello();

//import Product from './product';
const product = new Product('Product name');
product.show();