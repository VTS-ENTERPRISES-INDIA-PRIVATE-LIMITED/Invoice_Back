const express = require('express');
const cors = require('cors');
const router = require('./route/invoiceRouter.js');
const createTable = require('./model/invoiceModel.js');

require('dotenv').config();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  createTable(); // Create table when server starts
});
