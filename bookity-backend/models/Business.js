const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        durationMinutes: { type: Number, required: true }, // 30, 45, 60 etc
        price: { type: Number, required: true },           // in dollars
    },
    { _id: false }
);

const businessSchema = new mongoose.Schema(
    {
        owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
        },
        name: { type: String, required: true, trim: true },
        type: { type: String, required: true, trim: true }, // "barbershop", "nails", etc.
        description: { type: String, trim: true },
        address: { type: String, trim: true },
        city: { type: String, trim: true },
        phone: { type: String, trim: true },

        services: [serviceSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Business', businessSchema);
