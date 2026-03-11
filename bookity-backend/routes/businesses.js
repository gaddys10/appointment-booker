// routes/businesses.js
const express = require('express');
const router = express.Router();
const Business = require('../models/Business'); // adjust path if needed
const auth = require('../middleware/auth'); // must set req.user
const {
    createBusiness,
    listMyBusinesses,
    getMyBusinessById,
    addService,
    updateService,
    deleteService,
} = require('../services/business.service');


router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the businesses API!' });
});
// GET /api/businesses/mine?limit=20&skip=0&sort=-createdAt
// returns businesses owned by the authenticated user, with pagination and sorting
router.get('/mine', auth, async (req, res) => {
    try {
        const { limit = 20, skip = 0, sort = '-createdAt' } = req.query;
        const ownerId = req.user.uid;

        const { items, total } = await listMyBusinesses({ ownerId, limit, skip, sort });
        res.json({ total, count: items.length, items });
    } catch (err) {
        console.error('List my businesses failed:', err);
        res.status(err.status || 500).json({ error: err.message || 'Failed to list businesses' });
    }
});

// GET /api/businesses/:id
router.get('/:id', auth, async (req, res) => {
    try {
        const ownerId = req.user.uid;
        const b = await getMyBusinessById({ ownerId, businessId: req.params.id });
        res.json(b);
    } catch (err) {
        console.error('Get business failed:', err);
        res.status(err.status || 500).json({ error: err.message || 'Failed to get business' });
    }
});

// POST /api/businesses
router.post('/', auth, async (req, res) => {
    try {
        const ownerId = req.user.uid;

        // IMPORTANT: do not trust owner in body
        if (!req.body?.name) return res.status(400).json({ error: 'name is required' });
        if (!req.body?.type) return res.status(400).json({ error: 'type is required' });

        const b = await createBusiness({ ownerId, payload: req.body });
        res.status(201).json(b);
    } catch (err) {
        console.error('Create business failed:', err);
        res.status(err.status || 500).json({ error: err.message || 'Failed to create business' });
    }
});

// POST /api/businesses/:id/services
router.post('/:id/services', auth, async (req, res) => {
    try {
        const ownerId = req.user.uid;
        const s = req.body;

        if (!s?.name) return res.status(400).json({ error: 'service name is required' });
        if (typeof s.priceCents !== 'number') return res.status(400).json({ error: 'priceCents must be a number' });
        if (typeof s.durationMinutes !== 'number') return res.status(400).json({ error: 'durationMinutes must be a number' });

        const b = await addService({ ownerId, businessId: req.params.id, service: s });
        res.status(201).json(b);
    } catch (err) {
        console.error('Add service failed:', err);
        res.status(err.status || 500).json({ error: err.message || 'Failed to add service' });
    }
});

// PATCH /api/businesses/:id/services/:serviceId
router.patch('/:id/services/:serviceId', auth, async (req, res) => {
    try {
        const ownerId = req.user.uid;
        const b = await updateService({
        ownerId,
        businessId: req.params.id,
        serviceId: req.params.serviceId,
        patch: req.body,
        });
        res.json(b);
    } catch (err) {
        console.error('Update service failed:', err);
        res.status(err.status || 500).json({ error: err.message || 'Failed to update service' });
    }
});

// DELETE /api/businesses/:id/services/:serviceId
router.delete('/:id/services/:serviceId', auth, async (req, res) => {
    try {
        const ownerId = req.user.uid;
        const b = await deleteService({
        ownerId,
        businessId: req.params.id,
        serviceId: req.params.serviceId,
        });
        res.json(b);
    } catch (err) {
        console.error('Delete service failed:', err);
        res.status(err.status || 500).json({ error: err.message || 'Failed to delete service' });
    }
});

module.exports = router;
