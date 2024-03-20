// 1. import packages 
const express = require("express");
const mongoose = require('mongoose');  //connect to mongodb database
const dotenv = require("dotenv");   //hide sesnsitive data
const userRoutes = require("./routes/user")  //importing user Route

//2. creating express application
const app = express()
const port = 3000  /**setting port number  */

//5. configuring dotenv
dotenv.config()

//6. add middleware for json object
app.use(express.json()) //helps us pass json data from our request so we can make use of it in our server side code
app.use("/user", userRoutes)

// 4. connecting to mongodb database (connection string gotten from mongodb compass)
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("mongodb connected!") 
})

// 3. listening for connections(server creation)
app.listen(port, () => {
    console.log("Express server is running on port 3000");
})

//exporting app (to make use of it in other parts like routes)
module.exports = app