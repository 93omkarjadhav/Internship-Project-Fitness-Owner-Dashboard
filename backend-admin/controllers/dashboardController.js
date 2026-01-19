// server-admin/controllers/dashboardController.js
const db = require('../config/db');

// @route   GET /api/admin/dashboard/stats
// @desc    Get top-level dashboard stats (Users, Orders, Sales)
exports.getStats = async (req, res) => {
  try {
    const [userCount] = await db.query('SELECT COUNT(*) as count FROM users');
    const [orderCount] = await db.query('SELECT COUNT(*) as count FROM orders');
    const [salesSum] = await db.query('SELECT SUM(amount) as total FROM orders');
    const [pendingCount] = await db.query("SELECT COUNT(*) as count FROM orders WHERE status = 'Pending'");

    res.json({
      totalUsers: userCount[0].count,
      totalOrders: orderCount[0].count,
      totalSales: salesSum[0].total || 0,
      totalPending: pendingCount[0].count
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
// // @route   GET /api/admin/dashboard/chart
// // @desc    Get data for the Sales Chart (Sales over time)
// exports.getChartData = async (req, res) => {
//   try {
//     // Group orders by date (simple version)
//     const [data] = await db.query(`
//       SELECT DATE(order_date) as date, SUM(amount) as total 
//       FROM orders 
//       GROUP BY DATE(order_date) 
//       ORDER BY date ASC 
//       LIMIT 30
//     `);
//     res.json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// };

// // @route   GET /api/admin/dashboard/recent-orders
// // @desc    Get list for "Deals Details" table
// exports.getRecentOrders = async (req, res) => {
//   try {
//     const [orders] = await db.query(`
//       SELECT o.id, o.service_name, o.location, o.order_date, o.amount, o.status, u.full_name as user_name
//       FROM orders o
//       LEFT JOIN users u ON o.user_id = u.id
//       ORDER BY o.order_date DESC
//       LIMIT 10
//     `);
//     res.json(orders);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// };

// @route   GET /api/admin/dashboard/revenue-chart
// @desc    Big Chart: Sales vs Profit (Image 2)
exports.getRevenueChart = async (req, res) => {
  try {
    // 1. Get Monthly Sales
    const [salesData] = await db.query(`
      SELECT DATE_FORMAT(order_date, '%b') as month, SUM(amount) as sales
      FROM orders
      GROUP BY DATE_FORMAT(order_date, '%b'), MONTH(order_date)
      ORDER BY MONTH(order_date)
    `);

    // 2. Get Monthly Expenses (to calc profit)
    const [expenseData] = await db.query(`
      SELECT DATE_FORMAT(expense_date, '%b') as month, SUM(amount) as expense
      FROM expenses
      GROUP BY DATE_FORMAT(expense_date, '%b'), MONTH(expense_date)
      ORDER BY MONTH(expense_date)
    `);

    // 3. Combine them (Profit = Sales - Expense)
    // This maps the data for the frontend chart (e.g. Recharts)
    const combined = salesData.map(sale => {
      const expense = expenseData.find(e => e.month === sale.month)?.expense || 0;
      return {
        name: sale.month,
        Sales: sale.sales,
        Profit: sale.sales - expense // Simple profit calc
      };
    });

    res.json(combined);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/admin/dashboard/customers
// @desc    Donut Chart: New vs Repeated Customers
exports.getCustomerStats = async (req, res) => {
  try {
    // Logic: A "Repeated" customer is someone with > 1 order.
    // A "New" customer has exactly 1 order.
    
    const [rows] = await db.query(`
      SELECT user_id, COUNT(id) as order_count 
      FROM orders 
      GROUP BY user_id
    `);

    let newCustomers = 0;
    let repeatedCustomers = 0;

    rows.forEach(row => {
      if (row.order_count === 1) newCustomers++;
      else if (row.order_count > 1) repeatedCustomers++;
    });

    res.json({
      newCustomers,
      repeatedCustomers,
      total: newCustomers + repeatedCustomers
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/admin/dashboard/featured-service
// @desc    "Featured Service" Card
exports.getFeaturedService = async (req, res) => {
  try {
    // Find the service with the highest total sales amount
    const [rows] = await db.query(`
      SELECT service_name, SUM(amount) as total_revenue
      FROM orders
      GROUP BY service_name
      ORDER BY total_revenue DESC
      LIMIT 1
    `);

    // if (rows.length > 0) {
    //   res.json({
    //     name: rows[0].service_name,
    //     revenue: rows[0].total_revenue,
    //     image: "https://your-cloud-url.com/strength-icon.png" // Static or DB field
    //   });
    // } else {
    //   res.json({ name: "N/A", revenue: 0 });
    // }
    if (rows.length > 0) {
      // SIMPLE LOGIC TO PICK IMAGE BASED ON NAME
      let imageUrl = "/Image (4).png"; // Default image
      const name = rows[0].service_name.toLowerCase();

      if (name.includes("strength")) imageUrl = "/Image (2).png";
      else if (name.includes("yoga")) imageUrl = "/Image (3).png";
      else if (name.includes("supplement")) imageUrl = "/supplements.png"; // Make sure you have this image in public folder

      res.json({
        name: rows[0].service_name,
        revenue: rows[0].total_revenue,
        image: imageUrl 
      });
    } else {
      res.json({ name: "N/A", revenue: 0, image: "/Image (4).png" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/admin/dashboard/recent-orders
// @desc    "Deals Details" Table
exports.getRecentOrders = async (req, res) => {
  try {
    const [orders] = await db.query(`
      SELECT o.id, o.service_name, o.location, o.order_date, o.amount, o.status, u.full_name as user_name
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.order_date DESC
      LIMIT 5
    `);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/admin/dashboard/orders
// @desc    Get Filtered & Paginated Order List
exports.getOrders = async (req, res) => {
  try {
    // 1. Destructure Query Params
    const { page = 1, limit = 10, date, status, minPrice, maxPrice } = req.query;
    const offset = (page - 1) * limit;

    // 2. Build Dynamic SQL Query
    let query = `
      SELECT o.id, u.full_name as name, o.location as address, o.order_date as date, 
             o.amount as price, o.status
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      WHERE 1=1 
    `; // "WHERE 1=1" allows us to simply append "AND ..." clauses below

    const queryParams = [];

    // --- Filter: Date ---
    if (date) {
      query += ` AND DATE(o.order_date) = ?`;
      queryParams.push(date); // Format: 'YYYY-MM-DD'
    }

    // --- Filter: Status ---
    // Supports comma-separated list like "Completed,Processing"
    if (status) {
      const statuses = status.split(',');
      // Create placeholders (?,?,?) based on number of statuses
      const placeholders = statuses.map(() => '?').join(',');
      query += ` AND o.status IN (${placeholders})`;
      queryParams.push(...statuses);
    }

    // --- Filter: Price Range ---
    if (minPrice) {
      query += ` AND o.amount >= ?`;
      queryParams.push(minPrice);
    }
    if (maxPrice) {
      query += ` AND o.amount <= ?`;
      queryParams.push(maxPrice);
    }

    // --- Add Sorting & Pagination ---
    query += ` ORDER BY o.order_date DESC LIMIT ? OFFSET ?`;
    queryParams.push(parseInt(limit), parseInt(offset));

    // 3. Execute Query
    const [orders] = await db.query(query, queryParams);

    // 4. Get Total Count (for pagination UI "Showing 1-9 of 78")
    // We need a separate count query with the *same* filters (minus limit/offset)
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM orders o 
      WHERE 1=1
    `;
    const countParams = [];

    if (date) { countQuery += ` AND DATE(o.order_date) = ?`; countParams.push(date); }
    if (status) { 
      const statuses = status.split(',');
      const placeholders = statuses.map(() => '?').join(',');
      countQuery += ` AND o.status IN (${placeholders})`;
      countParams.push(...statuses);
    }
    if (minPrice) { countQuery += ` AND o.amount >= ?`; countParams.push(minPrice); }
    if (maxPrice) { countQuery += ` AND o.amount <= ?`; countParams.push(maxPrice); }

    const [totalResult] = await db.query(countQuery, countParams);

    res.json({
      orders,
      total: totalResult[0].total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalResult[0].total / limit)
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};