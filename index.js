// 1. import packages 
const express = require("express")
const mongoose = require('mongoose');
const dotenv = require("dotenv")

//2. creating express application
const app = express()
const port = 3000  /**setting port number  */

//5. configuring dotenv
dotenv.config()

// 4. connecting to mongodb database (connection string gotten from mongodb compass)
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("mongodb connected!") 
})

// 3. listening for connections 
app.listen(port, () => {
    console.log("Express server is running on port 3000");
})