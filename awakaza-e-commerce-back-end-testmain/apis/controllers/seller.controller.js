const{newSeller,
      newStore,
      viewSeller,
      viewStore,
      setVerification,
      insertOtp,
      getOtp,
      deleteOtp,
      getSellerByEmail,
      resetPassword,
      viewOrder,
      cancelledOrders,
      viewProducts,
      searchProduct,
      viewProductsById,
      readyOrders,
      markReady
                } = require("../services/seller.services")
 const {genSaltSync, hashSync,compareSync} = require("bcrypt")
 const nodemailer = require("nodemailer")
 const {sign} = require('jsonwebtoken');   
 const otpGenerator = require('otp-generator');            

module.exports={
    //Insert seller data to DB
    addSeller: async(req,res) =>{
        const body = req.body
        const salt =genSaltSync(10)
        body.password = hashSync(body.password,salt)
        viewSeller(body,(error,results) =>{
            // console.log(results)
            if(error){
                console.log(error)
                return res.status(500).json({
            
                    success:0,
                    message: "error"
                })
            } if(results){
                return res.status(400).json({
                    success:0,
                    message:"Email or Contact No Already in Use"
                })
            }else{
            newSeller(body,(error,results)=>{
                console.log(results)
                if(error){
                    console.log(error)
                    return res.status(500).json({
                        success:0,
                        message: "DataBase error"
                    })
                }else{
                return res.status(201).json({
                    success:1,
                    message: results
                })
            }
    
            })
            
        }
        })
        

    },
    //Insert Store Data to DB
    addStore: async(req,res) =>{
        const body = req.body
        newStore(body,(error,results)=>{
            if(error){
                return res.status(500).json({
                    success:0,
                    message: "error occured"
                })
            }
            
            return res.status(201).json({
                success:1,
                message: results
            })

        })

    },

    //Get seller Data by Email
    getSeller: async(req,res) =>{
        console.log(req.query)
        const body = req.query
        viewSeller(body,(error,results)=>{
            if(error){
                return res.status(500).json({
                    success:0,
                    message: error 
                })
            }
            if(!results){
                return res.status(400).json({
                    success: 0,
                    message: "User Not Found"
                })
            }
            results.password = undefined
            console.log(results)
            return res.status(200).json({
                success:1,
                message: results
            })

        })

    },
    //get storeData by User
    getStore: async(req,res) =>{
        const body = req.query
        console.log(req.query)
        viewStore(body.seller_id,(error,results)=>{
            
           
            // console.log(results)
            if(error){
                console.log(error)
                return res.status(500).json({
                    success:0,
                    message: error
                })
            }
            if(!results){
                return res.status(400).json({
                    success: 0,
                    message: "store Not Found"
                })
            }
            results.password = undefined
            console.log(results)
            return res.status(200).json({
                success:1,
                data : results[0]
            })

        })

    },
//-------------------------------------------------------------------//
    //Email Verification

    //Send verification Email
     verifyMail: async (req,res) =>{
        const email =req.body.email
        //set email transpoter data
        const trasporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user:'codesfirstecom@gmail.com',
                pass:'itghzohhnwnnscrs'
            },
            tls: {
                rejectUnauthorized: false
              }
        });
//generate otp
       const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        console.log(otp)
        const data = {email: email,
                      otp:otp }
         //save otp in db             
        insertOtp(data,(error,result) =>{
            if(error){
                return res.status(500).json({
                    success:0,
                    message: "db error try again"
                })
            }
            

        })
    
//email data
        const mailOptions = {
            from:'codesfirstecom@gmail.com',
            to: email,
            subject:'Email Verification',
            html:`Thank you for joining with us.Please verify your email address using this OTP.<br/>Your OTP is <h3><strong>${otp}</strong></h3> . OTP is valid only for 10 Minutes`
        };
        //send verification email
        trasporter.sendMail(mailOptions,(error,info) =>{
            if(error){
                console.log(error)
                return res.status(500).json({
                    success:0,
                    message: "NetworkError. Try again"
                })
            } else{
                console.log(info.response)
                return res.status(200).json({
                    success:1,
                    message: `Email successfully sent. please check your inbox`
                })
            }
        })



     },
     //Mark Email as Verified
     ConformVerification: async (req,res) =>{
        const body = req.body;
        // console.log(req.body)

        //get otp from db
        getOtp(body,(error,results) =>{
            // console.log(results[0].otp)
            //take last valid otp 
            const otp =results.pop();
            console.log(otp.otp)
            console.log()
            if(error){
                console.log(error)
                return res.status(500).json({
                    success: 0,
                    message:"database error"
                });
            } else if(results.lenght ===0){
                return res.status(400).json({
                    success:0,
                    message:"OTP Has Expired.Please Request a new OTp"
                })
                //compare with the otp sent from frontend
            } else if (otp.otp === body.otp){

                setVerification(body.email,(error,result) =>{
                    if(error){
                        console.log(error)
                        return res.status(500).json({
                            success: 0,
                            message:"Database Error"
                        })
                    }
                    deleteOtp(body.email,() =>{
                        if(error){
                            console.log(error)
                            return res.status(500).json({
                                success: 0,
                                message:"Database Error"
                            })
                        }return res.status(200).json({
                            success:1,
                            message:"verification was successfull. Your Account will be Activated Within One working Day"
            

                    })
                    
                    })
        
                })
            }else{
                return res.status(400).json({
                    success:0,
                    message:"Incorrect OTP.Please try again"
                })
            }

        })
        
     },

     //--------------------------------------------------------------//

     // Seller login
     login:async(req, res) =>{
        const body = req.body;
        // console.log(req.body)
        getSellerByEmail(body,(err,results) =>{
            if(err){ 
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"database error"
                })
                
            }
            
            if(!results){
                return res.status(400).json({
                    success: 0,
                    message: "User Not Found"


                });
            }if (results.is_verified===0){
                return res.status(400).json({
                    success:0,
                    message:"Your Account is Not yet Activated.Please Contact customer Service"
                })
            }
            console.log(results.is_verified)
            const passwordValidation = compareSync(body.password,results.password);
            if(passwordValidation){
                console.log("match")
                results.password = undefined;
                const jsontoken = sign({result:results},process.env.KEY,{
                    expiresIn: "3h"
                });
                return res.status(200).json({
                    success: 1,
                    message: "login succesfully",
                    token:jsontoken,
                    id:results.seller_id
                });
            }
            else {
                console.log("do not match")
                return res.status(401).json({
                    success: 0,
                    message: "invalid id or password"


                });
            }
        });
    },

    //---------------------------------------------------------------//

    //forgotpassword
    checkOtp: async(req,res) => {
        const body = req.body;
        
        getSellerByEmail(body,(err,results) =>{
            const userdata = results;
            console.log(results)
            if(err){ 
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"error occured"
                })
            }
            if(results.lenght===0){
                return res.status(400).json({
                    success: 0,
                    message: "User Not Found"


                });
            }if (results.is_verified===0){
                return res.status(400).json({
                    success:0.1,
                    message:"Your Account is Not yet Activated.Please Contact customer Service"
                })
            }else{
                getOtp(body,(error,results) =>{
                    const otp = results.pop()
                    if(error){
                        console.log(error)
                        return res.status(500).json({
                            success: 0,
                            message:"error occured.try again or contact customer service"
                        });
                    } else if(!results || results.lenght ===0){
                        return res.status(400).json({
                            success:0,
                            message:"OTP Has Expired.Please Request a new OTp"
                        })
                        //compare with the otp sent from frontend
                    } else if (otp.otp === body.otp){
                        // error occurs when otp is resend as this checks only with the first otp
                        const resetToken = sign({otp:results.otp},process.env.KEY, {expiresIn: "30m"} )
                        return res.status(201).json({
                            success: 1,
                            message:"otp verified",
                            token:resetToken
                     } )
                    }else{
                        return res.status(400).json({
                            success:0,
                            message:"Incorrect OTP.Please try again"
                        })
                    }
                })
            }
        })

    },
    updatePassword: (req,res) =>{
        console.log(req.body)
        const body = req.body
        const salt =genSaltSync(10)
        body.password = hashSync(body.password,salt)
        resetPassword(body,(error,results) =>{
            if(error){
                console.log(error)
                return res.status(500).json({
                    success:0,
                    message: "db error,try again"
                })
            }return res.status(201).json({
                success:1,
                message:"Password Changed Successfully "
            })

        })
    },
    // ---------- get Orders active orders relavent to seller ----------//
    getOrders: async(req,res) =>{
        const body = req.query
        viewOrder(body,(error,results)=>{
            if(error){
                return res.status(500).json({
                    success:0,
                    message: error 
                })
            }
            if(!results){
                return res.status(400).json({
                    success: 0,
                    message: "Seller Not Found"
                })
            }                                                                                                                                    
            console.log(results)
            return res.status(200).json({
                success:1,
                data: results
            })

        })

    },
    // ----  get cancelled orders 
    getcancelledOrders: async(req,res) =>{
        console.log(req.query)
        const body = req.query
        cancelledOrders(body,(error,results)=>{
            if(error){
                return res.status(500).json({
                    success:0,
                    message: error 
                })
            }
            if(!results){
                return res.status(400).json({
                    success: 0,
                    message: "Seller Not Found"
                })
            }                                                                                                                                    
            console.log(results)
            return res.status(200).json({
                success:1,
                data: results
            })

        })

    },
    // -------------get ready orders
    getReadyOrders: async(req,res) =>{
        console.log(req.query)
        const body = req.query
        readyOrders(body,(error,results)=>{
            if(error){
                return res.status(500).json({
                    success:0,
                    message: error 
                })
            }
            if(!results){
                return res.status(400).json({
                    success: 0,
                    message: "Seller Not Found"
                })
            }                                                                                                                                    
            console.log(results)
            return res.status(200).json({
                success:1,
                data: results
            })

        })

    },
    markReadyOrders: (req,res) =>{
     const body = req.body
     console.log(body)
     markReady(body,(err,result) =>{
           if(err){
            return res.status(500).json({
                success:0,
                message:"DB error"
            })
           }
           return res.status(200).json({
            success:1,
            message:"marked as ready"
           })
     })
    },
    // --- get all products -------
    getProducts: async(req,res) =>{
        const body = req.query
        viewProducts(body,(error,results)=>{
            if(error){
                console.log(error)
                return res.status(500).json({
                    success:0,
                    message: "db error"
                })
            }                                                                                                                                    
            console.log(results)
            return res.status(200).json({
                success:1,
                data: results
            })

        })

    },
    //--------search product------------
    searchProd: async(req,res) =>{
        const body = req.query
        searchProduct(body,(error,results)=>{
            if(error){
                console.log(error)
                return res.status(500).json({
                    success:0,
                    message: "db error"
                })
            }                                                                                                                                    
            console.log(results)
            return res.status(200).json({
                success:1,
                data: results
            })

        })
       
        

    },
    // ---- retrieve products by id----------
    getProductsById: async(req,res) =>{
        console.log(req.query)
        const body = req.query
        viewProductsById(body,(error,results)=>{
            if(error){
                console.log(error)
                return res.status(500).json({
                    success:0,
                    message: "db error"
                })
            }                                                                                                                                    
            console.log(results)
            return res.status(200).json({
                success:1,
                data: results
            })

        })

    },

    
    

 

}