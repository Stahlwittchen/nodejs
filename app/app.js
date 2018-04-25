//common js
const User = require('./user');
const Den = new User("Max");
Den.hello();

const pr = require('./product');
const product = new pr('Product module')
product.show();

//ES modules
//import User from './user';
//const John = new User('John');
//John.hello();