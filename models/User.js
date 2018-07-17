const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    isActive: Boolean,
    password: String,
    lastModifiedDate: Date
});

userSchema.pre('save', function(next) {
    this.lastModifiedDate = new Date();
    next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;