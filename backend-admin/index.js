const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db');
  
const gmailRoutes = require('./routes/gmailRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const teamRoutes = require('./routes/teamRoutes');
const uploadRoutes = require('./routes/uploadRoutes'); // ✨ Import this
const app = express();
const serviceRoutes = require('./routes/serviceRoutes'); // 👈 ADD THIS
const PORT = 5000; // USE A DIFFERENT PORT (5001) FOR ADMIN
const pricingRoutes = require('./routes/pricingRoutes'); // 👈 Add this
const kycRoutes = require('./routes/kycRoutes'); // Import KYC routes
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Frontend URL
// ✨ NEW ROUTES
app.use('/api/admin/invoice', invoiceRoutes);
app.use('/api/admin/team', teamRoutes);
app.use('/api/admin/auth', authRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);
// ✨ ADD THIS LINE
app.use('/api/admin/pricing', pricingRoutes); // 👈 Add this line
app.use('/api/admin/services', serviceRoutes); // 👈 ADD THIS LINE
app.use('/api/admin/upload', uploadRoutes);
app.use('/api/admin/kyc', kycRoutes); // Register
app.use('/api/gmail', gmailRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Admin Server running on http://localhost:${PORT}`);
});
