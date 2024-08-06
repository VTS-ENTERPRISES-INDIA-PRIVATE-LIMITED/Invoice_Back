const express = require('express');
const { createInvoice, getAllInvoices, getInvoiceByClientName, getInvoiceById, updateInvoiceById, deleteInvoiceById } = require('../controller/invoiceController.js');

const router = express.Router();

router.post('/invoice', createInvoice);

router.get("/get-all-invoives", getAllInvoices);

router.get("/get-invoice-id/:id", getInvoiceById);

router.get("/get-invoice-name/:client_name", getInvoiceByClientName);

router.put("/update-invoice-id/:id", updateInvoiceById);

router.delete("/delete-invoice-id/:id", deleteInvoiceById);

module.exports = router;
