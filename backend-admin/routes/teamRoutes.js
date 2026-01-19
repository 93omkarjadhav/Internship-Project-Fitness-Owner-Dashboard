const express = require('express');
const router = express.Router();
const { getTeamMembers, addTeamMember } = require('../controllers/teamController');

router.get('/', getTeamMembers);
router.post('/add', addTeamMember);

module.exports = router;