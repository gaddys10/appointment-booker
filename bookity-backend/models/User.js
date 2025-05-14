const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    phone: String,
    passwordHash: String,
    isProvider: Boolean,
    isVerified: Boolean,
    createdAt: Date
});

module.exports = mongoose.model('User', userSchema);