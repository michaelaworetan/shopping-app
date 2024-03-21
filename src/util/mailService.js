//util folder contains util functions
const nodemailer = require('nodemailer')   //import nodemailer
const dotenv = require('dotenv')   //importing dotenv 

dotenv.config()  //allow us to save our value into process.env by default

//12. creating nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {                             //authorization
        user: "mvillacs07@gmail.com",
        pass: process.env.MAIL_PASSWORD
    }
})


module.exports = {transporter}  //exporting it as a function not the whole package