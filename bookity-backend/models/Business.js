const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        priceCents: { type: Number, required: true }, // in cents to avoid float issues
        durationMinutes: { type: Number, required: true }, // 30, 45, 60 etc
        isActive: { type: Boolean, default: true }, // for soft-deleting services
    },
    { timestamps: true }
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
        description: { type: String, trim: true },
        type: { type: String, required: true, trim: true },
        address: { type: String, trim: true },
        city: { type: String, trim: true },
        phone: { type: String, trim: true },
        email: { type: String, trim: true, maxLength: 100 },
        services: { type: [serviceSchema], default: [] },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Business', businessSchema);
