const express = require('express');
const middleware = require("../middleware/protectedRouter.js");
const { createInvoice, getAllInvoices } = require('../controller/invoiceController.js');

const router = express.Router();

router.post('/create-invoice/:clientId', middleware, createInvoice);

router.get("/get-all-invoices/:clientId", middleware, getAllInvoices);


module.exports = router;
