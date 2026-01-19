const express = require('express');
const router = express.Router();
const auth = require('../middleware/adminAuth');
const { addPricingRule } = require('../controllers/pricingController');

// Protected Route to add rule
router.post('/add', auth, addPricingRule);

module.exports = router;