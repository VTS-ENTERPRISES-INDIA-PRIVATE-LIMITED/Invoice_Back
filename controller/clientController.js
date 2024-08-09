const connection = require('../db/connection');

const createClient = (req, res) => {
    const { company_name, email, phone } = req.body;
    const userId = req.userId;
    if(!company_name || !email || !phone)
    {
        return res.status(400).send({error: "All the fields are required..."});
    }
    const query = `INSERT INTO client(company_name, email, phone, user_id) VALUES (?, ?, ?, ?);`;
    connection.execute(query, [company_name, email, phone, userId], (err, result) => {
        if(err)
        {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).send({ error: "Client already registered." });
            }
            console.log("Error in the register, ", err.stack);
            return res.status(500).send({error: "Internal Server error..."});
        }
        if(result === 0)
        {
            return res.status(400).send({error: "Error while saving the data."});
        }
        return res.status(201).send({message: "Data saved.", client: result.insertId});
    })
}

const getClients = (req, res) => {
    const userId = req.userId;
    const query = `SELECT client.client_id, client.company_name, client.email, client.phone, client.date_of_created FROM client JOIN user ON client.user_id = user.user_id WHERE user.user_id = ?;`;
    connection.execute(query, [userId], (err, result) => {
        if(err)
        {
            return res.status(500).send({error: "Internal Server error.."});
        }
        if(result.affectedRows === 0)
        {
            return res.status(200).send([]);
        }
        res.status(200).send(result);
    })
}

const updateClient = (req, res) => {
    const {company_name, email, phone} = req.body;
    const user_id = req.userId;
    if(!company_name || !email || !phone)
    {
        return res.status(400).send({error: "All the fields are required..."});
    }
    const query = `UPDATE client set company_name = ?, phone = ? where email = ? AND user_id = ?;`;
    connection.execute(query, [company_name, phone, email, user_id], (err, result) => {
        if(err)
        {
            return res.status(500).send({error: "Internal Server error..."});
        }
        if(result === 0)
        {
            return res.status(400).send({error: "Error while updating the data."});
        }
        return res.status(201).send({message: "Data update.", clientId: result.insertId});
    })
}

const deleteClient = (req, res) => {
    const {clientId} = req.params;
    if(!clientId)
    {
        return res.status(400).send({error: "Client id is required."});
    }
    const query = `DELETE FROM client WHERE client_id = ? ;`;
    connection.query(query, [clientId], (err, result) => {
        if(err)
        {
            console.log("Error in the deleteClient...");
            return res.status(500).send({error: "Internal Server Error..."});
        }
        if(result.affectedRows === 0)
        {
            return res.status(404).send({error: "Client details not found..."});
        }
        res.status(200).send({message: "Client details deleted successfully..."});
    })
}


module.exports = {createClient, getClients, updateClient, deleteClient};