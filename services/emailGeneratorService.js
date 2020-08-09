//This code was adopted from Aayush Acharya from the website: https://medium.com/javascript-in-plain-english/how-to-send-emails-with-node-js-1bb282f334fe
//We express our appreciation for the contribution

const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const { PROVIDER, NAME, EMAIL, PASSWORD, MAIN_URL } = require("../config/config.json").app_email_access;

module.exports = (recepientName, subject, messageBody, emailAddress) => {

    let transporter = nodemailer.createTransport({
        service: PROVIDER,
        secure: false,
        auth: {
            user: EMAIL,
            pass: PASSWORD,
            
        },
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
        from: EMAIL,
        to: emailAddress,
        subject: subject,
        html: mail,
    };

    transporter
        .sendMail(message)
        .then(() => {
            return { msg: "you should receive an email from us" };
        })
        .catch((error) => console.error(error));
};

