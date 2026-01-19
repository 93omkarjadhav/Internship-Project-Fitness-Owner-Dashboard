const express = require('express');
const router = express.Router();
const gmailController = require('../controllers/gmailController');

router.get('/auth-url', gmailController.getAuthUrl);
router.get('/callback', gmailController.oauthCallback);
router.get('/list', gmailController.getRealEmails);
router.post('/send', gmailController.sendEmail);
module.exports = router;