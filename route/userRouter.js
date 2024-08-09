const express = require('express');
const { login, register, getOtp, verifyOtpAndSavePassword } = require("../controller/userController.js");

const route = express.Router();

route.post("/login", login);

route.post("/register", register);

route.get("/get-otp/:email", getOtp);

route.post("/verify-otp-password", verifyOtpAndSavePassword);

module.exports = route;