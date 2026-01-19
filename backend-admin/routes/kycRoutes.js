const express = require('express');
const router = express.Router();

const auth = require('../middleware/adminAuth'); // 1. Check Login
const adminRoleCheck = require('../middleware/adminRoleCheck'); // 2. Check Role (Admin only)

const { 
    getMyKycStatus, 
    getPendingRequests, 
    getCompletedRequests, 
    updateKycStatus 
} = require('../controllers/kycController');

// 🟢 PUBLIC (For Owners & Admins)
// Owners need this to see "Verification in Progress" screen
router.get('/my-status', auth, getMyKycStatus);


// 🔴 RESTRICTED (Admins Only)
// These routes will BLOCK anyone with role="Owner"
router.get('/pending', auth, adminRoleCheck, getPendingRequests);
router.get('/completed', auth, getCompletedRequests);
router.put('/:userId/action', auth, adminRoleCheck, updateKycStatus);

module.exports = router;