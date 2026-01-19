const db = require('../config/db');

// @route   POST /api/admin/pricing/add
// @desc    Add a new dynamic pricing rule
exports.addPricingRule = async (req, res) => {
  const { service_name, start_date, end_date, start_time, end_time, custom_price } = req.body;

  if (!service_name || !start_date || !end_date || !custom_price) {
    return res.status(400).json({ msg: "Please fill all required fields" });
  }

  try {
    // 1. Find Service ID by Name (since frontend dropdown sends Name)
    const [services] = await db.query('SELECT id FROM services WHERE name = ?', [service_name]);
    
    if (services.length === 0) {
      return res.status(404).json({ msg: "Service not found" });
    }
    const serviceId = services[0].id;

    // 2. Insert Rule
    // We convert empty time strings ("") to NULL for DB compatibility
    const sTime = start_time || null;
    const eTime = end_time || null;

    await db.query(`
      INSERT INTO pricing_rules 
      (service_id, start_date, end_date, start_time, end_time, custom_price)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [serviceId, start_date, end_date, sTime, eTime, custom_price]);

    res.json({ msg: "Pricing rule added successfully" });

  } catch (err) {
    console.error("Pricing Error:", err);
    res.status(500).send('Server error');
  }
};