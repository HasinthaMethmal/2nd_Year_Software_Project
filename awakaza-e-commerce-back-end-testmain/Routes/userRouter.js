const express=require('express');
const Router=express.Router();
const userService=require('../Services/userService');
const authController = require("../controllers/authController");
const jwt = require('jsonwebtoken');


Router.post("/newlogin", authController.login);
Router.post('/register',userService.userSignup);
Router.post("/forgotPassword", authController.forgotPassword);
Router.put("/reset-password/:resetToken", authController.resetPassword);
module.exports=Router
