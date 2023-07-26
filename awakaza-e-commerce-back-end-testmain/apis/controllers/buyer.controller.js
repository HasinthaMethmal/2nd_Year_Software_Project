const{insertToCart,  
       getCart,
       deleteInCart
       } = require("../services/buyer.services")

module.exports={
    addToCart: async(req,res) =>{
        const body = req.body
        insertToCart(body,(err,results)=>{
                 if(err){
                    console.log(err)
                    return res.status(500).json({
                        success: 0,
                        message: "DB error"
                    })
                 }
                 return res.status(200).json({
                    success: 1,
                    message: "Product added to cart"
                 })
        })
    },
    getFromCart: async(req,res) =>{
        const body = req.body
        getCart(body,(err,result) =>{
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "DB error"
                })
             }else if(!result){
                return res.status(400).json({
                    success: 0,
                    message: "Not Found"
                })
             }
             return res.status(200).json(
                {
                    success:1,
                    data:result
                }
             )

        })
    },
    deleteFromCart: async(req,res) =>{
        const body = req.body
       deleteInCart(body,(err,result) =>{
        if(err){
            console.log(err)
            return res.status(500).json({
                success: 0,
                message:"DB Error"
            })
        }return res.status(200).json({
            success:1,
            message:"succefully deleted"
        })

       })
    },
}