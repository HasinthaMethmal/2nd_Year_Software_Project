const database = require("../../database")

module.exports= {
    // add seller data
    newSeller: async(data,callback) =>
    {
        database.query(
            `INSERT INTO seller (first_name,last_name,password,contact_no,email)
             VALUES(?,?,?,?,?)`,
             [
                data.first_name,
                data.last_name,
                data.password,
                data.contact_no,
                data.email
              
            ],
            (error,results) =>{
                if(error){
                    return callback(error)
                }
                return callback(null,results)
            }
        )
    },
   // add store data
    newStore: async(data,callback) =>
    {
        database.query(
            `INSERT INTO stores (store_name,seller_id,description,address)
             VALUES(?,?,?,?)`,
             [
                data.store_name,
                data.seller_id,
                data.description,
                data.address,
                
              
            ],
            (error,results) =>{
                if(error){
                    return callback(error)
                }
                return callback(null,results)
            }
        )
    },
    // get seller account data by email or contact_no
    viewSeller: async(data,callback) =>{
        database.query(
            `SELECT * FROM seller WHERE email = ? OR contact_no=?   `,
            [
               data.email,
               data.contact_no
            ],
            
            (err,results,fields) =>{
                if(err){
                    console.log(err)
                    return callback(err)
                }
                return callback(null,results[0]);
            }
        )
    },
    getSellerByEmail: async(data,callback) =>{
        database.query(
            `SELECT * FROM seller WHERE email = ? `,
            [
               data.email,
            
            ],
            
            (err,results,fields) =>{
                if(err){
                    console.log(err)
                    return callback(err)
                }
                return callback(null,results[0]);
            }
        )
    },
    viewStore: async(seller_id,callback) =>{
        // console.log(seller_id)
        database.query(
            `SELECT st.seller_id,first_name,last_name,contact_no,email,store_id,store_name,description,address 
            FROM stores AS st JOIN seller AS sl  ON st.seller_id = sl.seller_id WHERE st.seller_id = ?  `,
            [seller_id],
            
            (err,results,fields) =>{
                if(err){
                    return callback(err)
                }
                return callback(null,results);
            }
        )
    },
    setVerification: async(email,callback) =>{
database.query(
    `UPDATE seller SET email_verified = 1 WHERE email =?`,
    [email],
    (err,results) =>{
        if(err){
            return callback(err)
        }
        return callback(null,results)
    }
)
    },

//----------------------------------------------------//
    //Otp verification
    // Insert otp to db
    insertOtp: async(data,callback) =>{
        database.query(
            `INSERT INTO otp (email,otp,created_at)
            VALUES(?,?,NOW())`,
            [data.email,
             data.otp
            ],
            (err,results) =>{
                if(err){
                    return callback(err)
                }
                return callback(null,results)
            }
            
        )
    },
    //select otp from db
    getOtp: async(data,callback) =>{
        database.query(
            `SELECT otp FROM otp WHERE email = ? AND created_at > DATE_SUB(NOW(), INTERVAL 10 MINUTE)`,
            [data.email],
            (err,results) =>{
                if(err){
                    return callback(err)
                }
                return callback(null,results)
            }
        )
    },
    //delete otp from db
    deleteOtp: async(email,callback) =>{
        database.query(
            `"DELETE FROM otp WHERE email = ?`,
            [email],
            (err,results) =>{
                if(err){
                    return callback(err)
                }
                return callback(null,results)
            }
        )
    },

    //-----------------------------------------------------//

    //reset password
    resetPassword: async(data,callback) =>{
        database.query(
            `UPDATE seller SET password = ? WHERE email =?`,
            [data.password,
             data.email   
            ],
            (err,results) =>{
                if(err){
                    return callback(err)
                }
                return callback(null,results)
            }
        )

    },
    //---get order details----//
    viewOrder: async(data,callback) =>{
        console.log(data)
        database.query(
            `SELECT * FROM seller_orders WHERE SellerID =${data.SellerID} AND cancellation_status=0 AND order_ready=0  `,
            
            (err,results,fields) =>{
                console.log(results)
                if(err){
                    console.log(err)
                    return callback(err)
                }
                return callback(null,results);
            }
        )
    },
    //----select cancelled orders----
    cancelledOrders: async(data,callback) =>{
        database.query(
            `SELECT * FROM seller_orders WHERE SellerID =${data.SellerID} AND cancellation_status=1  `,
            
            (err,results,fields) =>{
                
                if(err){
                    console.log(err)
                    return callback(err)
                }
                return callback(null,results);
            }
        )
    },
    readyOrders: async(data,callback) =>{
        database.query(
            `SELECT * FROM seller_orders WHERE SellerID =${data.SellerID} AND cancellation_status=0 AND order_ready =1   `,
            
            (err,results,fields) =>{
                
                if(err){
                    console.log(err)
                    return callback(err)
                }
                return callback(null,results);
            }
        )
    },
    // ----select all products ------
    viewProducts: async(data,callback) =>{
        database.query(
            `SELECT * FROM product`,
            
            (err,results,fields) =>{
                console.log(results)
                if(err){
                    console.log(err)
                    return callback(err)
                }
                return callback(null,results);
            }
        )
    },
    // --------search product-----
    searchProduct: async(data,callback) =>{
        database.query(
            `SELECT * FROM product WHERE productname LIKE '%${data.search}%'`,
            
            (err,results,fields) =>{
                console.log(results)
                if(err){
                    console.log(err)
                    return callback(err)
                }
                return callback(null,results);
            }
        )
    },
    viewProductsById: async(data,callback) =>{
        database.query(
            `SELECT * FROM product WHERE productid =${data.productid}`,
            
            (err,results,fields) =>{
                console.log(results)
                if(err){
                    console.log(err)
                    return callback(err)
                }
                console.log(results)
                return callback(null,results);
            }
        )
    },
    markReady: async(data,callback) =>{
        database.query(
            `UPDATE seller_orders SET order_ready = true WHERE id=${data.id}`,
            (err,results,fields) =>{
                if(err){
                    return callback(err)
                }
                return callback(null,results)
            }
        )

    },

}