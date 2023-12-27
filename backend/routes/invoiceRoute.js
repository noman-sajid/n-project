const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController'); // Create this file later

// Define routes for creating invoices
router.post('/', invoiceController.createInvoice);

module.exports = router;