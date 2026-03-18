const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // make sure this exists
const { signAccess, signRefresh } = require('../utils/token');

const pendingVerifications = new Map();
const pendingPwResets = new Map();

router.post('/login', async (req, res) => { 

    const { email, phone, password } = req.body;

    if (!password || (!email && !phone))
        return res.status(400).json({ error: 'Missing credentials' });

    // find the user by email or phone
    const query = email ? { email: email.toLowerCase().trim() } : { phone };
    const user = await User.findOne(query);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // compare the provided password with the stored hash
    const ok = await bcrypt.compare(password, user.passwordHash || '');
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    // Generate access JWT token
    const access = signAccess({ uid: user._id, role: user.isProvider ? 'provider' : 'customer' });

    // Generate refresh JWTtoken
    const refresh = signRefresh({ uid: user._id, v: user.tokenVersion || 0 });

    // If you’re building a web app, you might set cookies.
    // For React Native, easier to RETURN tokens in JSON & store in SecureStore.
    // If you also want cookies for web, uncomment below:
    // res.cookie('access_token', access, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 1000*Number(process.env.ACCESS_TTL) });
    // res.cookie('refresh_token', refresh, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 1000*Number(process.env.REFRESH_TTL) });

    res.status(200).json({
        user: { id: user._id, email: user.email, isProvider: user.isProvider, firstName: user.firstName, lastName: user.lastName },
        tokens: { access, refresh }
    });
});

// Mock user creation
router.post('/sign-up', async (req, res) => {
    //only need email/phone to ID pending verification entry
    // & OTP to confirm user is owner of email/phone
    const { email, phone, code} = req.body;
    console.log('➡️  POST /sign-up hit', { email, phone, code }); 

    const id = email || phone;
    if (!id){ return res.status(400).json({ error: 'Email or phone required' });}

    // lookup pending verification
    const pending = pendingVerifications.get(id);
    if (!pending) {
        return res.status(400).json({ error: 'No verification request found for this user. Please request a new code.' });
    }

    // OTP should expire; if its old, delete it so it can't be re-used
    if (pending.expiresAt && pending.expiresAt < Date.now()) {
        pendingVerifications.delete(id);
        return res.status(400).json({ error: 'Verification code has expired. Please request a new one.' });
    }

    if (pending.code !== code) {
        return res.status(400).json({ error: 'Invalid verification code. Please try again.' });
    }

    // NOT taking password/name/etc from req.body here
    // b/c we're creating user using exact data from pendingVerifications
    // when they requested the code (pending.formData))
    // -> prevents data tampering and inconsistent user data
    const {firstName, lastName, email: storedEmail, phone: storedPhone, password, isProvider } = pending.formData;

    try {
        // ✅ Store only a hashed password in DB (never plaintext).
        const hashedPassword = await bcrypt.hash(password, 10);

        const userToCreate = {
            firstName,
            lastName,
            email: storedEmail,
            phone: storedPhone,
            passwordHash: hashedPassword,
            isProvider,
            isVerified: true,
            createdAt: new Date()
        };

        // ⬅ Create user in Mongo
        const createdUser = await User.create(userToCreate);

        // Centralize secret management in .env. in prod, always requre a real env seret
        const secret = process.env.JWT_SECRET || 'dev-secret-change-me';

        // ✅ ACCESS TOKEN:
        // This is what the client sends on every request: Authorization: Bearer <access>
        // We are KEEPING your existing behavior here — you were already signing one token.
        // Only change: we name it "access" to match your /login response shape.
        // const access = jwt.sign(payload, secret, { expiresIn: '7d' });

        // const access = jwt.sign(
        //     {
        //         uid: createdUser._id,
        //         email: createdUser.email,
        //         isProvider: createdUser.isProvider,
        //     },
        //     secret,
        //     { expiresIn: '7d' }
        // );

        const access = signAccess({
            uid: createdUser._id,
            role: createdUser.isProvider ? 'provider' : 'customer',
        });
        // ⬅️ sign the token (use env secret in real life)
        // const token = jwt.sign(
        //     payload,
        //     process.env.JWT_SECRET || 'dev-secret-change-me',
        //     { expiresIn: '7d' }
        // );

         // ✅ REFRESH TOKEN (NEW):
        // Why add this? Because your /login returns tokens: { access, refresh }.
        // Your signup endpoint used to return a single `token`, so the app had two formats.
        // Adding refresh here makes signup and login consistent, and enables "stay logged in"
        // later when access tokens expire.
        //
        // This is *minimal* refresh: a long-lived JWT with a type marker.
        // Later, you can add rotation/tokenVersion stored in DB for revocation.
        // const refresh = jwt.sign(
        //     {
        //         userId: createdUser._id,
        //         type: 'refresh',
        //         // tokenVersion: createdUser.tokenVersion || 0, // optional later (revocation)
        //     },
        //     secret,
        //     { expiresIn: '30d' }
        // );

        const refresh = signRefresh({
            uid: createdUser._id,
            v: createdUser.tokenVersion || 0,
        });

        // ⬅️ strip passwordHash before sending user back
        const userObject = createdUser.toObject();
        delete userObject.passwordHash;
        
        // prevent re-use of the same code
        pendingVerifications.delete(id);

        console.log('✅ User created: ', userObject);

        res.status(201).json({ 
            message: 'User created: ', 
            user: userObject,
            tokens: { access, refresh } // <- single response
        });

    } catch (err) {
        console.error('❌ Signup error:', err); 
        res.status(500).json({ error: 'Signup error' });
    }
});

// Mock verification code request
router.post('/sign-up/request-code', (req, res) => {
    // get user information from the request body
    const { email, phone, password, isProvider, firstName, lastName } = req.body;
    if (!email && !phone) return res.status(400).json({ error: 'Email or phone required' });

    const id = email || phone;

    // Generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store the code and user data in pendingVerifications
    // with email/phone as the key
    pendingVerifications.set(id, {
        code,
        formData: { email, phone, password, isProvider, firstName, lastName },
        expiresAt: Date.now() + 5 * 60 * 1000 // code valid for 5 minutes
    });

    // Simulate sending the code via SMS or Email
    console.log(`📬 Code sent to ${id}: ${code}`);

    // the response that returns upon request 200 success
    res.status(200).json({ message: code });
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
        
        // Generate a random 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        console.log(`🔑 Password reset requested for ${user}`);
        
        // Simulate sending the code via SMS or Email
        console.log(`📬 Code sent to ${user.email ? user.email : user.phone}: ${code}`);

        return res.status(200).json({ message: code }); // <- single response
        // res.status(404).json({ error: 'password reset request unsucessful' });
    }
});

module.exports = router; 