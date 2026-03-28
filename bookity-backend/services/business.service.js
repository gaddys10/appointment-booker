// services/business.service.js
const mongoose = require('mongoose');
const Business = require('../models/Business');
const User = require('../models/User');

async function addService({ ownerId, businessId, service }) {
    const b = await getMyBusinessById({ ownerId, businessId });
    b.services.push({
        name: service.name,
        description: service.description,
        priceCents: service.priceCents,
        durationMinutes: service.durationMinutes,
        isActive: service.isActive ?? true,
    });
    await b.save();
    return b;
}

function assertObjectId(id, msg = 'Invalid id') {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error(msg);
        err.status = 400;
        throw err;
    }
}

async function createBusiness({ ownerId, payload }) {
    const business = await Business.create({
        owner: ownerId,
        name: payload.name,
        description: payload.description,
        type: payload.type,
        phone: payload.phone,
        email: payload.email,
        address: payload.address,
        city: payload.city,
        services: payload.services ?? [],
    });

    await User.findByIdAndUpdate(
        ownerId, 
        { $addToSet: { businesses: business._id } },
        { new: true }
    );

    return business;
}

async function deleteService({ ownerId, businessId, serviceId }) {
    assertObjectId(serviceId, 'Invalid service id');
    const b = await getMyBusinessById({ ownerId, businessId });

    const s = b.services.id(serviceId);
    if (!s) {
        const err = new Error('Service not found');
        err.status = 404;
        throw err;
    }

    s.deleteOne();
    await b.save();
    return b;
}

async function getMyBusinessById({ ownerId, businessId }) {
    assertObjectId(businessId, 'Invalid business id');
    const b = await Business.findOne({ _id: businessId, owner: ownerId });
    if (!b) {
        const err = new Error('Business not found');
        err.status = 404;
        throw err;
    }
    return b;
}

async function listMyBusinesses({ ownerId, limit = 20, skip = 0, sort = '-createdAt' }) {
    const q = { owner: ownerId };
    const [items, total] = await Promise.all([
        Business.find(q).sort(sort).skip(Number(skip)).limit(Number(limit)),
        Business.countDocuments(q),
    ]);
    return { items, total };
}

async function updateService({ ownerId, businessId, serviceId, patch }) {
    assertObjectId(serviceId, 'Invalid service id');
    const b = await getMyBusinessById({ ownerId, businessId });
    const s = b.services.id(serviceId);
    if (!s) {
        const err = new Error('Service not found');
        err.status = 404;
        throw err;
    }

    // Only allow patching specific fields
    const allowed = ['name', 'description', 'priceCents', 'durationMins', 'isActive'];
    for (const k of allowed) {
        if (typeof patch[k] !== 'undefined') s[k] = patch[k];
    }

    await b.save();
    return b;
}



module.exports = {
    createBusiness,
    listMyBusinesses,
    getMyBusinessById,
    addService,
    updateService,
    deleteService,
};
