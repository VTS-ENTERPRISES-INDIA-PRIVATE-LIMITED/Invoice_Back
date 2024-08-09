const express = require('express');
const cors = require('cors');

const invoiceTable = require('./model/invoiceModel.js');
const clientTable = require("./model/clientModel.js");
const userTable = require("./model/userModel.js");
const invoiceRouter = require('./route/invoiceRouter.js');
const clientRouter = require("./route/clientRouter.js")
const userRouter = require("./route/userRouter.js");
const dropTable = require("./model/DropTables.js");

require('dotenv').config();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/invoices', invoiceRouter);
app.use("/clients", clientRouter);
app.use("/users", userRouter);
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to invoice backend....");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
   //dropTable('invoices');
  //  dropTable('client');
  //  dropTable("user");
  userTable();
  clientTable();
  invoiceTable();
});
