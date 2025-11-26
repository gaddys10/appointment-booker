// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // adjust path if needed

// GET /api/users?limit=20&skip=0&sort=-createdAt&email=foo@bar.com
// GET /api/users/
router.get('/', async (req, res) => {
    try {
        const {
            limit = 20,
            skip = 0,
            sort = '-createdAt',
            email,
            phone,
            isProvider,
        } = req.query;

    const q = {};
    if (email) q.email = email;
    if (phone) q.phone = phone;
    if (typeof isProvider !== 'undefined') q.isProvider = isProvider === 'true';

    const [items, total] = await Promise.all([
        User.find(q)
            .select('-passwordHash')        // never return hashes
            .sort(sort)
            .skip(Number(skip))
            .limit(Number(limit)),
        User.countDocuments(q),
    ]);

    res.json({ total, count: items.length, items });
    } catch (err) {
        console.error('List users failed:', err);
        res.status(500).json({ error: 'Failed to list users' });
    }
});

// GET /api/users/:id
router.get('/:id', async (req, res) => {
    try {
        const u = await User.findById(req.params.id).select('-passwordHash');
        if (!u) return res.status(404).json({ error: 'User not found' });
        res.json(u);
    } catch (err) {
        console.error('Get user failed:', err);
        res.status(400).json({ error: 'Invalid user id' });
    }
});

module.exports = router;
