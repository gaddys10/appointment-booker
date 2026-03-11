// middleware/auth.js
const { verifyAccess } = require('../utils/token');
const mongoose = require('mongoose');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);

    try {
        const decoded = verifyAccess(token);
        const rawUid = decoded.uid || decoded.userId;

        if (!rawUid) {
            return res.status(401).json({ error: 'Token missing user id' });
        }

        req.user = { ...decoded, uid: new mongoose.Types.ObjectId(String(rawUid))};
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = auth;