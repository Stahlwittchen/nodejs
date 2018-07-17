const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
    name: {
        type: String,
        validate: function (name) {
            return name.charAt(0) === name.charAt(0).toUpperCase()
        }
    },
    country: String,
    capital: Boolean,
    location: {
        lat: Number,
        long: Number
    },
    lastModifiedDate: Date
});

citySchema.pre('save', function(next) {
    const date = new Date;
    this.lastModifiedDate = date.toString();
    next();
});


const City = mongoose.model('City', citySchema);

module.exports = City;