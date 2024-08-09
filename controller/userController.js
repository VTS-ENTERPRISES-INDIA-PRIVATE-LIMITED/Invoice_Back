const connection = require('../db/connection');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("../mailService/sendMail.js");

const login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ error: "Required all the fields..." });
    }
    const query = `SELECT * FROM user WHERE email = ? `;
    connection.execute(query, [email], async (err, result) => {
        if (err) {
            console.log("Error in the login, ", err.stack);
            return res.status(500).send({ error: "Internal server error..." });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "User not found..." });
        }
        try {
            const bcryptedpassword = result[0].password;
            const isPasswordCorrect = await bcrypt.compare(password, bcryptedpassword);
            if (!isPasswordCorrect) {
                return res.status(401).send({ error: "Incorrect password..." });
            }
            const token = await jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "1d" });
            res.status(200).send({ message: "Login Success...", token: token });
        } catch (error) {
            console.log("Error in the login, ", error.stack);
            return res.status(500).send({error: "Internal server error..."});
        }
    });
}

const register = async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
        return res.status(400).send({ error: "Required all the fields..." });
    }
    if (password !== confirmPassword) {
        return res.status(401).send({ error: "Password and confirm password are not matched..." });
    }
    const salt = await bcrypt.genSalt(10);
    const bcryptedpassword = await bcrypt.hash(password, salt);
    const query1 = `INSERT INTO user(email, password) VALUES (?, ?)`;
    connection.execute(query1, [email, bcryptedpassword], async (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).send({ error: "Email already registered." });
            }
            console.log("Error in the register, ", err.stack);
            return res.status(500).send({ error: "Internal server error..." });
        }
        if (result.affectedRows === 0) {
            return res.status(500).send({ error: "Failed to save user details." });
        }
        const token = await jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "1d" });
        res.status(201).send({ message: "Registeration Success...", token: token });
    });
}

const getRandomSixDigitNumber = () => {
    return Math.floor(Math.random() * 900000) + 100000;
}


const getOtp = (req, res) => {
    const { email } = req.params;
    if (!email) {
        return res.status(400).send({ error: "Email is required..." });
    }
    const query2 = `UPDATE user set otp = ? WHERE email = ? ;`;
    const otp = getRandomSixDigitNumber();
    connection.execute(query2, [otp, email], (err, result) => {
        if (err) {
            console.log("Error in the getOpt, ", err.stack);
            return res.status(500).send({ error: "Internal Server error..." });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "User not found..." });
        }
        sendEmail(email, otp);
        return res.status(200).send({ message: "Otp is sent...", otp: otp })
    });
}

const verifyOtpAndSavePassword = (req, res) => {
    const { email, password, confirmPassword, otp } = req.body;
    if (!email || !password || !confirmPassword || !otp) {
        return res.status(400).send({ error: "All the fields are required..." });
    }
    if (password !== confirmPassword) {
        return res.status(400).send({ error: "password and confirm password are not matched...." });
    }
    const query = `UPDATE user SET password = ? WHERE email = ? AND otp = ? ;`;
    connection.execute(query, [password, email, otp], (err, result) => {
        if (err) {
            console.log("Error in the VerifyotpandSavePassword, ", err.stack);
            return res.status(500).send({ error: "Internal server error..." });
        }
        if (result.affectedRows === 0) {
            return res.status(400).send({ error: "Invalid otp..." });
        }
        return res.status(200).send({ message: "Your password reset is successfull..." });
    });
}

module.exports = { login, register, getOtp, verifyOtpAndSavePassword }