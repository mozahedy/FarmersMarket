//This code was adopted from Aayush Acharya from the website: https://medium.com/javascript-in-plain-english/how-to-send-emails-with-node-js-1bb282f334fe
//We express our appreciation for the contribution

const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const { PROVIDER, NAME, USER, PASSWORD, MAIN_URL } = require("../config/config.json").app_email_access;

module.exports = async (recepientEmail, recepientName, subject, messageBody) => {

    let transporter = nodemailer.createTransport({
        host: PROVIDER,
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {

            user: USER,
            pass: PASSWORD,

        }
    });

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: NAME,
            link: MAIN_URL,
        },
    });

    let response = {
        body: {
            name: recepientName,
            intro: "Thank you for using FarmersMarket! We're very excited to have you with us. \n\n" + messageBody,
            outro: "Sincerely,\n\nFarmer"
        },
    };


    let mail = MailGenerator.generate(response);


    let message = {
        from: USER + "@gmail.com",
        to: recepientEmail,
        subject: subject,
        html: mail,
    };

    await transporter.sendMail(message)
    try {
        return { msg: "you should receive an email from us" };
    } catch (error) {
        console.error(error);
    }
};

