const express = require('express');
const router = express.Router();
const { login, getAccounts,register, getMe, updateMe,forgotPassword, resetPassword} = require('../controllers/authController');
const adminAuth = require('../middleware/adminAuth'); // You need to create this!
router.post('/login', login);
router.get('/accounts', getAccounts);
router.post('/register', register);

// ✨ Protected Routes (Requires Login)
router.get('/me', adminAuth, getMe);
router.put('/me', adminAuth, updateMe);
router.post('/forgot-password', forgotPassword); // ✨ Step 1
router.post('/reset-password', resetPassword);   // ✨ Step 2
module.exports = router;