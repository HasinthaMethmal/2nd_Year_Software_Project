const {addCategory,
      changeCommission,
      viewCommission,
      addCommission,
      deleteCategory} = require("../services/admin.services");

     

module.exports ={

    //Add new User category to Database
    createCategory: async(req,res) =>{
        const body = req.body;

        // console.log(req.body)
        addCategory(body,(err,results) =>{

            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: "Database Error"
                });
            }
            console.log(results)
            return res.status(201).json({
                success: 1,
                message: "User Category added successfully"
            })
        })

    },

    //Insert Commission value to new category
    createCommission: async(req,res) =>{
        const body = req.body;
        // console.log(req.body)
        addCommission(body,(err,results) =>{

            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: "db error"
                });
            }
            console.log(results)
            return res.status(201).json({
                success: 1,
                message: "commission added suceesfully"
            })
        })

    },

    //view All commission values
    getCommission: async(req,res) =>{
        
        viewCommission((err,results) =>{

            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: "Database Error"
                });
            }
            if(!results){
                return res.status(400).json({
                    success: 0,
                    Message: "Commission data not found. database error "

                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });

    },

    //update commision of an Existing Category
    updateCommission: async(req,res) =>{
        const body = req.body;
        changeCommission(body,(err,results) =>{

            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: "error occured try again"
                });
            }
            console.log(results)
            return res.status(200).json({
                success: 1,
                message: "commission updated successfully"
            })
        })

    },

    //remove an User_category 
    removeCategory: async(req,res) =>{
        const body = req.body;
        deleteCategory(body,(err,results) =>{

            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: "error occured invailid category.try again"
                });
            }
            console.log(results)
            return res.status(201).json({
                success: 1,
                message: "category removed successfully"
            })
        })

    },

}

