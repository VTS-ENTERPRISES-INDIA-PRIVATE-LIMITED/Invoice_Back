const express = require('express');
const middleware = require("../middleware/protectedRouter.js");
const { createInvoice, getAllInvoices, getAllInvoicess } = require('../controller/invoiceController.js');

const router = express.Router();

router.post('/create-invoice/:clientId', middleware, createInvoice);

router.get("/get-all-invoices/:clientId", middleware, getAllInvoices);

router.get("/get-all-invoicess", middleware, getAllInvoicess);


module.exports = router;
