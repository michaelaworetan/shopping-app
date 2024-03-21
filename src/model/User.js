//importing mongoose
const mongoose = require("mongoose")
const crypto = require("crypto")  //built-in module to generate verification token

//Contains code for userSchema and User model creation
// 6. creating userSchema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // name property is a required or else it returns an error
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { 
        street: String,
        city: String,
        state: String,
        country: String,
    },
    phoneNumber: { type: String, required: true },
    // 10. properties for user verification
    isVerified: { type: Boolean, default: false }, //any user that will be created won't be verified by default
    verificationToken: { type: String, default: crypto.randomBytes(32).toString('hex') } //verify user we want it to be unique at all times using the crypto module
})

//7. creating a model from the userSchema
const User = mongoose.model("User", userSchema) //make Usermodel available in the code so you can create users and query the Usermodel using moongose query functions (find, findByIdAndDelete)

module.exports = User //exporting the User and making it available to other parts of the project