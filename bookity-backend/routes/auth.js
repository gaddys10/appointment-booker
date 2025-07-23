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
    // get user information from the request body
    const { email, phone, password, isProvider } = req.body;

    // check if email or phone is provided
    if (!email && !phone) return res.status(400).json({ error: 'Email or phone required' });

    // get the user ID from email or phone
    const id = email || phone;

    // Generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store the code and user data in pendingVerifications
    // with email or phone as the key
    pendingVerifications.set(id, {
        code,
        formData: { email, phone, password, isProvider }
    });

    // Simulate sending the code via SMS or Email
    console.log(`📬 Code sent to ${id}: ${code}`);

    // the response that returns upon request 200 success
    res.status(200).json({ message: 'Verification code sent' });
});

module.exports = router; // ✅ THIS LINE IS MANDATORY