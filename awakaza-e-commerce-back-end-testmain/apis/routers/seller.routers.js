const sellerRoutes = require('express').Router()
const{addSeller,
      addStore,
      getSeller,
      verifyMail,
      ConformVerification,
      login,
      checkOtp,
      updatePassword,
      getStore,
      getOrders,
      getcancelledOrders,
      getProducts,
      searchProd,
      getProductsById,
      getReadyOrders,
      markReadyOrders
             } = require('../controllers/seller.controller')
const {validateToken} = require("../../Auth/token_validation")


sellerRoutes.post('/Addseller',addSeller)
sellerRoutes.post('/Addstore',addStore)
sellerRoutes.get('/Getseller',getSeller)
sellerRoutes.get('/Getstore',validateToken,getStore)
sellerRoutes.post('/VerificationEmail',verifyMail)
sellerRoutes.post('/ConformEmail',ConformVerification)
sellerRoutes.post('/forgotpassword',checkOtp)
sellerRoutes.patch('/resetpassword',validateToken,updatePassword)
sellerRoutes.post('/login',login);
sellerRoutes.get("/orders",validateToken,getOrders)
sellerRoutes.get("/cancelledorders",validateToken,getcancelledOrders)
sellerRoutes.get("/readyorders",validateToken,getReadyOrders)
sellerRoutes.get('/products',getProducts)
sellerRoutes.get('/searchproducts',searchProd)
sellerRoutes.get('/productsbyid',getProductsById)
sellerRoutes.patch('/markready',validateToken,markReadyOrders)

module.exports = sellerRoutes