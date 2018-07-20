const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        validate: function (name) {
            return name.charAt(0) === name.charAt(0).toUpperCase()
        }
    },
    price: {
        type: String,
        validate: function (price) {
            console.log(price)
            return price > 0
        }
    },
    availability: Boolean,
    reviews : String,
    lastModifiedDate: Date
});

productSchema.pre('save', function(next) {
    this.lastModifiedDate = new Date();
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;