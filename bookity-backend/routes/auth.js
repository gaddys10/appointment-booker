const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // make sure this exists
const { signAccess, signRefresh } = require('../utils/token');

const pendingVerifications = new Map();
const pendingPwResets = new Map();

router.post('/login', async (req, res) => { 

    // extract email, phone, and password from request body
    const { email, phone, password } = req.body;

    // validate that password and either email or phone is provided
    if (!password || (!email && !phone))
        return res.status(400).json({ error: 'Missing credentials' });

    // find the user by email or phone
    const query = email ? { email: email.toLowerCase().trim() } : { phone };
    const user = await User.findOne(query);

    // Generic error to avoid account enumeration
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // (Optional) require verification first
    // if (!user.isVerified) return res.status(401).json({ error: 'Invalid credentials' });

    // compare the provided password with the stored hash
    const ok = await bcrypt.compare(password, user.passwordHash || '');

    // Generic error to avoid account enumeration
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    // Generate JWT tokens
    // Generate access token
    const access = signAccess({ uid: user._id, role: user.isProvider ? 'provider' : 'customer' });

    // Generate refresh token
    const refresh = signRefresh({ uid: user._id, v: user.tokenVersion || 0 });

    // If you’re building a web app, you might set cookies.
    // For React Native, it’s easier to RETURN tokens in JSON and store in SecureStore.
    // If you also want cookies for web, uncomment below:
    // res.cookie('access_token', access, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 1000*Number(process.env.ACCESS_TTL) });
    // res.cookie('refresh_token', refresh, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 1000*Number(process.env.REFRESH_TTL) });

    res.status(200).json({
        user: { id: user._id, email: user.email, isProvider: user.isProvider },
        tokens: { access, refresh }
    });
});

// Mock user creation
router.post('/sign-up', async (req, res) => {

    const { email, phone, password, isProvider } = req.body;
    console.log('➡️  POST /sign-up hit', { email, isProvider }); 

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

        await User.create(user); 

        console.log('✅ User created: ', { email, isProvider });
        res.status(201).json({ message: 'User created: ', user });
    } catch (err) {
        console.error('❌ Signup error:', err); 
        res.status(500).json({ error: 'Signup error' });
    }
});

// Mock verification code request
router.post('/sign-up/request-code', (req, res) => {
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
    res.status(200).json({ message: code });
    // res.status(404).json({ error: 'request unsucessful' });
});

router.post('/forgot-password/reset-password', async (req, res) => {
    const { identifier, newPassword } = req.body;
    var found = false;

    // validate that either email or phone is provided
    if (!identifier || !newPassword) return res.status(400).json({ error: 'Identifier and new password required' });

    // find the user by email or phone
    const userEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier) ? await User.findOne({ email: identifier.toLowerCase().trim() }) : null;
    const userPhone = /^\+?[1-9]\d{1,14}$/.test(identifier) ? await User.findOne({ phone: identifier.trim() }) : null;

    // set user to the found information
    if (userEmail) {
        found = true;
        var user = userEmail;
    }
    if (userPhone) {
        found = true;
        var user = userPhone;
    }

    // if the user is found, proceed with password reset process
    if (found) {
        try {
            // hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // update the user's password in the database
            user.passwordHash = hashedPassword;
            await user.save();
            
            console.log(`✅ Password reset successful for ${user}`);
            return res.status(200).json({ message: 'Password reset successful' });
        } catch (error) {
            console.error('❌ Error resetting password:', error);
            return res.status(500).json({ error: 'Error resetting password' });
        }
    } else {
        return res.status(404).json({ error: 'User not found' });
    }
});

router.post('/forgot-password/request-code', async (req, res) => {
    const { email, phone } = req.body;
    var found = false;

    // validate that either email or phone is provided
    if (!email && !phone) return res.status(400).json({ error: 'Email or phone number required' });

    // find the user by email or phone
    const userEmail = email ? await User.findOne({ email: email.toLowerCase().trim() }) : null;
    const userPhone = phone ? await User.findOne({ phone: phone.trim() }) : null;

    // set user to the found information
    if (userEmail) {
        found = true;
        var user = userEmail;
    }
    if (userPhone) {
        found = true;
        var user = userPhone;
    }

    // if the user is found, proceed with password reset process
    if (found) {
        // Here you would generate a reset token and send an email
        // For simplicity, we just log it

        // Generate a random 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        console.log(`🔑 Password reset requested for ${user}`);
        
        // Simulate sending the code via SMS or Email
        console.log(`📬 Code sent to ${user.email ? user.email : user.phone}: ${code}`);

        return res.status(200).json({ message: code }); // <- single response
        // res.status(404).json({ error: 'password reset request unsucessful' });
    }

});




module.exports = router; // ✅ THIS LINE IS MANDATORY