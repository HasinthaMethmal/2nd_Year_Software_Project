const buyerRoutes = require('express').Router();
const{addToCart, getFromCart,deleteFromCart} = require("../controllers/buyer.controller");

buyerRoutes.post("/addtocart",addToCart)
buyerRoutes.get("/getcart",getFromCart)
buyerRoutes.post("/deletefromcart",deleteFromCart)

module.exports = buyerRoutes;
