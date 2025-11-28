require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');

const app = express();

// mongosh "mongodb://localhost:27017/bookity"

// Middleware
app.use(express.json()); // for parsing application/json
app.use(cors());
app.use(morgan('dev')); // logs all requests (GET, POST, etc.)

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));



module.exports = app;