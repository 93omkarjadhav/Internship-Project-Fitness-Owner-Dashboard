// server-admin/middleware/adminRoleCheck.js

module.exports = function (req, res, next) {
  // 1. Check if the user is logged in (req.admin is set by previous auth middleware)
  if (!req.admin) {
    return res.status(401).json({ msg: 'Unauthorized. Please log in.' });
  }

  // 2. STRICT CHECK: Is the role 'Admin'?
  // Based on your DB screenshot: 'Omkar Jadhav' (ID 4) has role 'Admin'.
  // 'Moni Roy' (ID 1) has role 'Owner'.
  if (req.admin.role !== 'Admin') {
    return res.status(403).json({ 
      msg: 'Access Denied: You do not have permission to view this page.' 
    });
  }

  // 3. User is an Admin, let them pass.
  next();
};