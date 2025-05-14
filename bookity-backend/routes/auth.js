const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // make sure this exists

const pendingVerifications = new Map();

// Mock user creation
router.post('/signup', async (req, res) => {
    const { email, phone, password, isProvider } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            email,
            phone,
            passwordHash: hashedPassword,
            isProvider,
            isVerified: false,
            createdAt: new Date()
        };

    await User.create(user); // uncomment when model exists
        res.status(201).json({ message: 'User created (mock)', user });
    } catch (err) {
        res.status(500).json({ error: 'Signup error' });
    }
});

// Mock verification code request
router.post('/request-code', (req, res) => {
    const { email, phone, password, isProvider } = req.body;

    if (!email && !phone) return res.status(400).json({ error: 'Email or phone required' });

    const id = email || phone;
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    pendingVerifications.set(id, {
        code,
        formData: { email, phone, password, isProvider }
    });

    console.log(`📬 Code sent to ${id}: ${code}`); // Simulate SMS/Email

    res.status(200).json({ message: 'Verification code sent' });
});

module.exports = router; // ✅ THIS LINE IS MANDATORY