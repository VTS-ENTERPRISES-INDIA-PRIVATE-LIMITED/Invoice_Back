const nodemailer = require("nodemailer");

const sendEmail = (reciever, otp) => {
    const transporter = nodemailer.createTransport(
        {
            host: "smtp.gmail.com",
            auth: {
                user: "d.balasubrahmanyam4@gmail.com",
                pass: "etit tskv fjqq cgoz",
            },
        }
    );

    const mail = {
        from: "d.balasubrahmanyam4@gmail.com",
        to: reciever,
        subject: "Otp for forgot password.",
        text: `You requested otp ${otp} for the forgotten password.`,

    }
    transporter.sendMail(mail, (err, info) => {
        if(err)
        {
            console.log("Error while sending the mail, ", err.stack);
        }
        else{
            console.log("Email has sent : ", info.response);
        }
    })
}

module.exports = sendEmail;