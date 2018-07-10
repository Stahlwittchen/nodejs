const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
    name: String,
    country: String,
    capital: Boolean,
    location: {
        lat: Number,
        long: Number
    }
});


const City = mongoose.model('City', citySchema);

module.exports = City;