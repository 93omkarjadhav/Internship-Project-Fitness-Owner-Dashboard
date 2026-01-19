// server-admin/controllers/invoiceController.js
const db = require('../config/db');

// @route   GET /api/admin/invoice/:orderId
// @desc    Get full invoice details for an order
exports.getInvoice = async (req, res) => {
  const { orderId } = req.params;

  try {
    // 1. Get Order & Customer Info (Invoice To)
    const [orderRows] = await db.query(`
      SELECT o.id, o.order_date, o.amount, o.location, 
             u.full_name as customer_name, u.email as customer_email, u.address as customer_address
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      WHERE o.id = ?
    `, [orderId]);

    if (orderRows.length === 0) {
      return res.status(404).json({ msg: "Order not found" });
    }

    const order = orderRows[0];

    // 2. Get Admin Info (Invoice From) - For now, hardcoded or first admin
    // In a real app, this might be the admin who processed it
    const [adminRows] = await db.query('SELECT full_name, email FROM admins LIMIT 1');
    const admin = adminRows[0];

    // 3. Get Line Items
    const [items] = await db.query(`
      SELECT description, quantity, base_cost, total_cost 
      FROM order_items 
      WHERE order_id = ?
    `, [orderId]);

    // 4. Construct Response
    const invoiceData = {
      invoiceId: `INV-${order.id.toString().padStart(4, '0')}`,
      dates: {
        invoiceDate: order.order_date,
        dueDate: new Date(new Date(order.order_date).setDate(new Date(order.order_date).getDate() + 14)) // +14 days
      },
      from: {
        name: admin?.full_name || "FitFare HQ",
        address: "9694 Krajcik Locks Suite 635" // Or fetch from DB settings
      },
      to: {
        name: order.customer_name,
        address: order.customer_address || order.location
      },
      items: items,
      total: order.amount
    };

    res.json(invoiceData);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// @route   POST /api/admin/invoice/:orderId/send
// @desc    Mock send invoice via email
exports.sendInvoice = async (req, res) => {
  // In a real app, you would use Nodemailer here
  const { orderId } = req.params;
  console.log(`Sending invoice for Order #${orderId} to customer...`);
  
  // Simulate delay
  setTimeout(() => {}, 500);
  
  res.json({ msg: "Invoice sent successfully!" });
};