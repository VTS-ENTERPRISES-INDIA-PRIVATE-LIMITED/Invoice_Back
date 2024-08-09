const jwt = require("jsonwebtoken");
const connection = require("../db/connection.js");


const middleware = (req, res, next) => {
    const {authorization} = req.headers;

        if (!authorization) {
            return res.status(401).send({ error: "UnAuthorized - No token provided..." });
        }
        const token = authorization.replace("Bearer ", "");

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if(!decoded)
        {
            return res.status(401).send({error: "Invalid token or token expired..."});
        }
        const email = decoded.email;
        const query = `SELECT * FROM user WHERE email = ? ;`;
        connection.execute(query, [email], (err, result) => {
            if(err)
            {
                return res.status(500).send({error: "Internal server error..."});
            }
            if(result.affectedRows === 0)
            {
                return res.status(401).send({error: "UnAuthorized - Invalid token"});
            }
            req.userEmail = decoded.email;
            req.userId = result[0].user_id;
            next();
        })
        

    
}

module.exports = middleware;
