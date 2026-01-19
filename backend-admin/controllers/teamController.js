// server-admin/controllers/teamController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

// @route   GET /api/admin/team
// @desc    Get all team members (Images shows cards)
exports.getTeamMembers = async (req, res) => {
  try {
    const [members] = await db.query(`
      SELECT id, full_name, email, role, position, avatar_url, phone, gender 
      FROM admins
    `);
    res.json(members);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// @route   POST /api/admin/team/add
// @desc    Add a new team member
exports.addTeamMember = async (req, res) => {
  const { firstName, lastName, email, phone, position, gender, avatar_url } = req.body;

  if (!email || !firstName) {
    return res.status(400).json({ msg: "Name and Email are required" });
  }

  try {
    // 1. Check existing
    const [existing] = await db.query('SELECT id FROM admins WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(400).json({ msg: "Email already exists" });

    // 2. Hash default password (e.g., 'welcome123')
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash('welcome123', salt);

    // 3. Combine Name
    const fullName = `${firstName} ${lastName}`;
    
    // 4. Insert
    // NOTE: 'role' isn't in your form, so we default to 'Admin' or derive from Position
    const [result] = await db.query(`
      INSERT INTO admins 
      (full_name, first_name, last_name, email, phone, position, gender, password_hash, role, avatar_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Admin', ?)
    `, [fullName, firstName, lastName, email, phone, position, gender, password_hash, avatar_url]);

    res.json({ msg: "Team member added successfully", id: result.insertId });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};