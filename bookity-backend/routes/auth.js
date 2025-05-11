const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// const User = require('../models/User'); // make sure this exists

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

    // await User.create(user); // uncomment when model exists
        res.status(201).json({ message: 'User created (mock)', user });
    } catch (err) {
        res.status(500).json({ error: 'Signup error' });
    }
});

module.exports = router; // ✅ THIS LINE IS MANDATORY