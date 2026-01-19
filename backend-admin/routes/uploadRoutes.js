// server-admin/routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const router = express.Router();

const upload = multer({ storage });

// @route   POST /api/admin/upload  
// @desc    Upload an image (Avatar or Cover)
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    // Return the Cloudinary URL
    res.json({ url: req.file.path });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;