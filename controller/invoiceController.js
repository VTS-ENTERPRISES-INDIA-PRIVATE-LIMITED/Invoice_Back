const connection = require('../db/connection');

// Controller to handle creating a new invoice
const createInvoice = (req, res) => {
    const { client_name, invoice_link, payable_amount, products } = req.body;

    if (!client_name || !invoice_link || !payable_amount || !products) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const productsJson = JSON.stringify(products);

    const insertQuery = `
    INSERT INTO invoices (client_name, invoice_link, payable_amount, products) 
    VALUES (?, ?, ?, ?);
  `;

    connection.query(insertQuery, [client_name, invoice_link, payable_amount, productsJson], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err.stack);
            return res.status(500).json({ error: 'Database insertion failed' });
        }

        res.status(201).json({ message: 'Invoice created successfully', invoiceDetailsId: results.insertId });
    });
};

// Controller to retrieve all invoices
const getAllInvoices = (req, res) => {
    const query = "SELECT * FROM invoices;";
    connection.query(query, (err, result) => {
        if (err) {
            console.error("Error fetching invoices:", err.stack);
            return res.status(500).json({ error: "Internal server error while fetching invoices" });
        }
        res.status(200).json(result);
    });
};

// Controller to retrieve an invoice by client name
const getInvoiceByClientName = (req, res) => {
    const { client_name } = req.params;
    const query = "SELECT * FROM invoices WHERE client_name = ?;";

    connection.query(query, [client_name], (err, result) => {
        if (err) {
            console.error("Error finding invoice by client name:", err.stack);
            return res.status(500).json({ error: "Internal server error while fetching invoice by client name" });
        }
        res.status(200).json(result);
    });
};

// Controller to retrieve an invoice by ID
const getInvoiceById = (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM invoices WHERE id = ?;";

    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error finding invoice by ID:", err.stack);
            return res.status(500).json({ error: "Internal server error while fetching invoice by ID" });
        }
        res.status(200).json(result);
    });
};

//Controller to update an invoice
const updateInvoiceById = (req, res) => {
    const { id } = req.params;
    const { client_name, invoice_link, payable_amount, products } = req.body;
    if (!client_name || !invoice_link || !payable_amount || !products) {
        return res.status(400).send({ error: "All fields are required..." });
    }
    const productsJson = JSON.stringify(products)
    const query = `UPDATE invoices set client_name = ?, invoice_link = ?,  payable_amount = ?, products = ? where id = ? ;`;
    connection.query(query, [client_name, invoice_link, payable_amount, productsJson, id], (err, result) => {
        if (err) {
            console.log("Error while Updating the invoice data...", err.stack);
            return res.status(400).send({ error: "Internal Server error... while updating the invoice." });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Invoice is not found..." });
        }
        res.status(200).send({ message: "Invoice updated successfully" });
    });
}


//controller to delete an update
const deleteInvoiceById = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM invoices where id = ? ;`;
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.log("Error while deleting the invoice...", err.stack);
            return res.status(200).send({ error: "Internal Server Error...while the deleting invoice..." });
        }
        if(result.affectedRows === 0)
        {
            return res.status(404).send({error: "Invoice not found..."});
        }
        res.status(200).send({message: "Invoice deleted successfully..."});
    });
}

module.exports = { createInvoice, getAllInvoices, getInvoiceByClientName, getInvoiceById, updateInvoiceById, deleteInvoiceById };
