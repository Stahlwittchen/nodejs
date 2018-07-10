const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: String,
    price: String,
    availability: Boolean,
    reviews : String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;