const database = require("../../database")

module.exports= {
    insertToCart: async(data,callback) =>
    {
        database.query(
            `INSERT INTO buyer_cart (product_id,buyer_id,quantity)
             VALUES(?,?,?)`,
             [
                data.product_id,
                data.buyer_id,
                data.quantity
            ],
            (error,results) =>{
                if(error){
                    return callback(error)
                }
                return callback(null,results)
            }
        )
    },
    getCart: async(data,callback) =>{
        // console.log(seller_id)
        database.query(
            `SELECT *FROM buyer_cart AS b JOIN product AS p  ON b.product_id = p.productid `,
            (err,results,fields) =>{
                if(err){
                    return callback(err)
                }
                return callback(null,results);
            }
        )
    },
    deleteInCart: async(data,callback) =>{
        database.query(
            `DELETE FROM buyer_cart WHERE item_id=${data.id}`,
            (err,results,fields) =>{
                if(err){
                    return callback(err)
                }
                return callback(null,results)
            }
        )

    },
    

}