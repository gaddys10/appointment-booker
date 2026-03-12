const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, index: true, trim: true, lowercase: true },
        phone: { type: String, index: true, sparse: true },
        passwordHash: { type: String, required: true },
        isProvider: { type: Boolean, default: false, index: true },
        isVerified: { type: Boolean, default: false, index: true },
        businesses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Business' }],
    },
    { 
        timestamps: true 
    } // adds createdAt & updatedAt automatically
);

module.exports = mongoose.model('User', userSchema);