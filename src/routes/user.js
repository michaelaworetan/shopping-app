const express = require("express") //importing express
// Importing userController 
const userController = require("../controller/User")
const app = require("../index")  //import functionality from app
//user routes with user controller function as the second argument

//creating a router
const router = express.Router()

router.post("/users", userController.createUser) //calling createUser from userController which i'm importing from  my User.js controller file

module.exports = router
