//This code was adopted from Aayush Acharya from the website: https://medium.com/javascript-in-plain-english/how-to-send-emails-with-node-js-1bb282f334fe
//We express our appreciation for the contribution

const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
// const xoauth2 = require('xoauth2');

const { PROVIDER, NAME, EMAIL, USER, PASSWORD, MAIN_URL } = require("../config/config.json").app_email_access;

module.exports = (recepientName, subject, messageBody) => {

    let transporter = nodemailer.createTransport({
        service: PROVIDER,
        port: 2525,
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator({

            }),
            type: "PLAIN",
            user: USER,
            clientId: '410497885631-fd3jeamk56ra23gjkcbad5pcaea8l3dc.apps.googleusercontent.com',
            clientSecret: 'lrU2claZRc6iTxxLIRtKpcn',
            refreshToken: '',
            // pass: PASSWORD,
  
        },
        tls: {
            rejectUnauthorized: false
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
        from: USER,
        to: EMAIL,
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

