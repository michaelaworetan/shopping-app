// User controller containing code for the route
const User = require("../model/User")   //iomport User from model
const bcrypt = require("bcrypt")  //password hashing
const saltRounds = 10 //adding salt (10 digit charater to make the app more secure)

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

        //saving the new user in the database(save function on the newUser object)
        await newUser.save()
        //sending a response as a json object with newUser
        res.status(201).json(newUser)
    } catch (error) {
        console.error(error);
        //500(issue with server side code)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// expose funtionality
module.exports = { createUser, }
