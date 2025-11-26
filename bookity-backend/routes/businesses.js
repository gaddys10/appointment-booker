const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
// adjust this import to whatever your auth middleware is called
const auth = require('../middleware/auth'); 