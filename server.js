const express = require('express');
const cors = require('cors');
const router = require('./route/invoiceRouter.js');
const createTable = require('./model/invoiceModel.js');

require('dotenv').config();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api', router);
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to invoice backend....");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  createTable(); // Create table when server starts
});
