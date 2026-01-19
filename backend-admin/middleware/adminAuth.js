// server-admin/middleware/adminAuth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token'); // Or 'Authorization: Bearer ...'

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded.admin; // { id: 1, role: 'Owner' }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};