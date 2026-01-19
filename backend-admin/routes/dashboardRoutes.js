const express = require('express');
const router = express.Router();
const { 
  getStats, 
  getRevenueChart, 
  getCustomerStats, 
  getFeaturedService,
  getRecentOrders ,
  getOrders
} = require('../controllers/dashboardController');// You can add auth middleware here later

router.get('/stats', getStats);
router.get('/revenue-chart', getRevenueChart); // Big chart
router.get('/customers', getCustomerStats);    // Donut chart
router.get('/featured-service', getFeaturedService);
router.get('/recent-orders', getRecentOrders);
// ✨ New Route for Order List Page
router.get('/orders', getOrders); 
module.exports = router;