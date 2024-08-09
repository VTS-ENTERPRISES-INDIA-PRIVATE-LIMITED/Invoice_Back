const express = require('express');
const middleware = require("../middleware/protectedRouter.js");
const { createClient, getClients, updateClient, deleteClient } = require("../controller/clientController.js");

const router = express.Router();
 
router.post("/create-client", middleware, createClient);

router.get("/get-clients", middleware, getClients);

router.put("/update-client", middleware, updateClient);

router.delete("/delete-client/:clientId", middleware, deleteClient);

module.exports = router;