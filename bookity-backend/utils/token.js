// utils/token.js
// Utility functions for signing JWT tokens
// Requires: jsonwebtoken
const jwt = require('jsonwebtoken');

// Sign an access token with a short TTL
const signAccess = (payload) =>
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: Number(process.env.ACCESS_TTL) });

// Sign a refresh token with a longer TTL
const signRefresh = (payload) =>
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: Number(process.env.REFRESH_TTL) });

module.exports = { signAccess, signRefresh };