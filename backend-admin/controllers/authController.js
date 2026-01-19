// server-admin/controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sendEmail = require('../config/mailer');
// --- ✨ NEW: Register Admin API ---
exports.register = async (req, res) => {
  const { full_name, email, password, role } = req.body;

  if (!email || !password || !full_name) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // 1. Check if admin exists
    const [existing] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    // 2. Hash the password (CRITICAL STEP)
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // 3. Insert into DB
    const [result] = await db.query(
      'INSERT INTO admins (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [full_name, email, password_hash, role || 'Admin']
    );

    res.json({ msg: "Admin registered successfully", adminId: result.insertId });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
// @route   POST /api/admin/auth/login  
// @desc    Admin Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(400).json({ msg: 'Invalid Credentials' });

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const payload = { admin: { id: admin.id, role: admin.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });

    res.json({ token, admin: { name: admin.full_name, role: admin.role, avatar: admin.avatar_url } });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/admin/auth/accounts
// @desc    Get list of admin accounts (Image C "Choose an account")
exports.getAccounts = async (req, res) => {
  try {
    const [admins] = await db.query('SELECT id, full_name,email, role, avatar_url FROM admins');
    res.json(admins);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/admin/auth/me
// @desc    Get current admin profile
exports.getMe = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, full_name, email, phone, role, position, avatar_url, cover_photo_url, gender FROM admins WHERE id = ?', [req.admin.id]);
    if (rows.length === 0) return res.status(404).json({ msg: "Admin not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/admin/auth/me
// @desc    Update admin profile (Settings Page)
exports.updateMe = async (req, res) => {
  const { full_name, email, phone, position, gender, avatar_url } = req.body; // 'avatar_url' is the Logo

  // Basic validation
  if (!email || !full_name) {
    return res.status(400).json({ msg: "Name and Email are required" });
  }

  const updatedAdmin = {
    full_name,
    email,
    phone,
    position, // This maps to "Description" or "Branch Name" in your UI if needed
    gender,
    avatar_url
  };

  try {
    await db.query('UPDATE admins SET ? WHERE id = ?', [updatedAdmin, req.admin.id]);
    res.json({ msg: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// @desc    Step 1: Send OTP
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Check user
    const [users] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
    if (users.length === 0) return res.status(404).json({ msg: 'Email not found' });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    // Save OTP to DB
    await db.query('UPDATE admins SET reset_otp = ?, reset_otp_expires = ? WHERE email = ?', [otp, expiresAt, email]);

    // Send Email
    await sendEmail(email, 'Password Reset OTP', `<h3>Your OTP is: <b>${otp}</b></h3><p>Valid for 10 minutes.</p>`);

    res.json({ msg: 'OTP sent to your email' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// @desc    Step 2: Reset Password with OTP
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    // Verify OTP
    const [users] = await db.query(
      'SELECT * FROM admins WHERE email = ? AND reset_otp = ? AND reset_otp_expires > NOW()',
      [email, otp]
    );

    if (users.length === 0) return res.status(400).json({ msg: 'Invalid or expired OTP' });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update DB & Clear OTP
    await db.query(
      'UPDATE admins SET password_hash = ?, reset_otp = NULL, reset_otp_expires = NULL WHERE email = ?',
      [hashedPassword, email]
    );

    res.json({ msg: 'Password reset successful. Please login.' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};