const {verify} = require("jsonwebtoken");

module.exports ={
    validateToken: (req, res, next) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            verify(token,process.env.KEY,(err,decoded)=>{
                if(err){
                    res.json({
                        success: 0,
                        message: "Your Session Is Expired.try Again"
                    });
                }else{
                    next();
                }

            });

        }else{
            res.json({
                success: 0,
                message: "Access denied"
            });
        }


    }
};