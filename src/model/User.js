//importing mongoose
const mongoose = require("mongoose")


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
})

//7. creating a model from the userSchema
const User = mongoose.model("User", userSchema) //make Usermodel available in the code so you can create users and query the Usermodel using moongose query functions (find, findByIdAndDelete)

module.exports = User //expoerting the User and making it available to other parts of the project