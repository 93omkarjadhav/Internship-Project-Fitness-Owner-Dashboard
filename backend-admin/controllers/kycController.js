const db = require('../config/db');

// ==========================================
//  1. COMMON ROUTE (For Owners & Admins)
// ==========================================

// @desc    Get MY own KYC status (For the KYC progress page)
exports.getMyKycStatus = async (req, res) => {
  try {
    const [admin] = await db.query(
      'SELECT kyc_status, created_at FROM admins WHERE id = ?', 
      [req.admin.id]
    );

    if (admin.length === 0) return res.status(404).json({ msg: 'User not found' });

    res.json({
      status: admin[0].kyc_status,
      submitted_at: admin[0].created_at
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};


// ==========================================
//  2. ADMIN ONLY ROUTES (Strict Access)
// ==========================================

// @desc    Get all users waiting for approval
exports.getPendingRequests = async (req, res) => {
  try {
    // Fetch only Owners who are pending
    const [pendingUsers] = await db.query(`
      SELECT id, full_name, email, phone, created_at 
      FROM admins 
      WHERE role = 'Owner' AND kyc_status = 'pending' 
      ORDER BY created_at DESC
    `);
    res.json(pendingUsers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all approved users
exports.getCompletedRequests = async (req, res) => {
  try {
    const [approvedUsers] = await db.query(`
      SELECT id, full_name, email, phone, created_at 
      FROM admins 
      WHERE role = 'Owner' AND kyc_status = 'approved' 
      ORDER BY created_at DESC
    `);
    res.json(approvedUsers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// @desc    Approve or Reject an Owner
exports.updateKycStatus = async (req, res) => {
  const { userId } = req.params;
  const { action } = req.body; // 'approve' or 'reject'

  const newStatus = action === 'approve' ? 'approved' : 'rejected';

  try {
    const [result] = await db.query(
      'UPDATE admins SET kyc_status = ? WHERE id = ? AND role = "Owner"',
      [newStatus, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Owner not found." });
    }

    res.json({ msg: `Owner ${newStatus} successfully.` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};