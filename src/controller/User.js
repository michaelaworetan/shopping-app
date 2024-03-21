// User controller containing code for the route
const User = require("../model/User")   //import User from model
const { transporter } = require("../util/mailService")    //import transporter function from mailService in the Util folder
const dotenv = require('dotenv')   //importing dotenv 
const bcrypt = require("bcrypt")  //password hashing  
const saltRounds = 10 //adding salt (10 digit charater to make the app more secure)

dotenv.config()  //allow us to save our value into process.env by default

//8. To create a user we need to create a new route
//post method because we are trying to create a new resource
let createUser = async(req, res) => {
    try {
        //destructure request.body
        let {name, email, password, address, phoneNumber} = req.body

        // 9. Hashing of password 
        const hashedPassword = await bcrypt.hash(password, saltRounds)  // passing password gotten from req.body

        //creating new user based on what we destructured from the Usermodel
        const newUser = new User({ //adding propertieswhat you have in the schema) which have been destructured from req.body
            name, //(one-word key value pair property)
            email, 
            password: hashedPassword, //hashing before creating user..changing the value of password
            address, 
            phoneNumber
        })

        //11. function for sending mail
        sendVerificationEmail(newUser) //passing the newUser as the parameter value

        //saving the new user in the database(save function on the newUser object)
        await newUser.save()
        //sending a response as a json object with newUser
        res.status(201).json(newUser)
    } catch (error){
        console.error(error);
        //500(issue with server side code)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

//13. sendVericationEmail function definition
let sendVerificationEmail = async (user) => {
    //creating verification link from verification token
    const verificationLink = `http://localhost:3000/user/verifyUser?token=${user.verificationToken}` //verifyUser endpoint

    //setting up mail options(from, to and so on)
    const mailOptions = {
        from: "Shopping App <mvillacs07@gmail.com>", //hide the name of the gmail under the shopping app
        to: user.email,
        subject: "Verify your email address",
        //Template for sending verification mails
        text: `
        Hello ${user.name},

        Please click on the link below to verify your email address:
        ${verificationLink}

        If you didn't create an account, please disregard this email.

        Thank you, 
        The Shopping App team
        `
    }
    //sending the mail using mailOptions
    try {
        transporter.sendMail(mailOptions)
        console.log("Verification mail sent");
    } catch (error) {   //catch any error when sending mail
        console.error(error);
    }
}

// expose funtionality
module.exports = { createUser, }
