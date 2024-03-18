// 1. import express 
const express = require("express")

const port = 3000  /**setting port number  */ 

//2. creating express application
const app = express()


// 3. listening for connections 
app.listen(port, () => {
    console.log("Express server is running on port 3000");
} )