// server-admin/routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/adminAuth');
const { 
    getAllServices, 
    updateServiceDetails, 
    uploadServiceImages 
} = require('../controllers/serviceController');

// Multer setup for memory storage (needed for Cloudinary stream upload)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes (Protected by 'auth' middleware)
router.get('/', auth, getAllServices);
router.put('/:id/details', auth, updateServiceDetails);

// Route for uploading multiple images (field name 'images', max 5 at a time)
router.post('/:id/images', auth, upload.array('images', 5), uploadServiceImages);

module.exports = router;