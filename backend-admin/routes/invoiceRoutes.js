const express = require('express');
const router = express.Router();
const { getInvoice, sendInvoice } = require('../controllers/invoiceController');

router.get('/:orderId', getInvoice);
router.post('/:orderId/send', sendInvoice);

module.exports = router;