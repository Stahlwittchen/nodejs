const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: String,
    isActive: Boolean,
    password: String
});


const User = mongoose.model('User', userSchema);

module.exports = User;