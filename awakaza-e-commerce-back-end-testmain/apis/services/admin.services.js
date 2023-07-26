const database = require("../../database")

module.exports ={
    addCategory: (data,callback) =>{
        database.query(
            `INSERT INTO user_categories (category_name,is_active)
            values(?,1)`,
            [
                data.category_name,
            ],
            (err,results,fields) =>{
                if(err){
                    return callback(err)
                }
                return callback(null,results);
            }
        )
    },
    deleteCategory: (data,callback) =>{
        database.query(
            `UPDATE user_categories SET is_active = 0 WHERE  category_Id=?`,
            [
                data.category_Id,
                
            ],
            (err,results,fields) =>{
                if(err){
                    return callback(err)
                }
                return callback(null,results);

            }
        )
    },

    
    addCommission: (data,callback) =>{
        database.query(
            `INSERT INTO commission (commission_rate,category_id)
            values(?,?)`,
            [
                data.commission_rate,
                data.category_id
            ],
            (err,results,fields) =>{
                if(err){
                    return callback(err)
                }
                return callback(null,results);
            }
        )
    },
    viewCommission: async(callback) =>{
        database.query(
            `SELECT * 
            FROM commission AS c RIGHT JOIN user_categories AS u  ON c.category_id = u.category_Id WHERE u.is_active = 1  `,
            
            (err,results,fields) =>{
                if(err){
                    return callback(err)
                }
                return callback(null,results);
            }
        )
    },
    changeCommission: (data,callback) =>{
        database.query(
            `UPDATE commission SET commission_rate = ? WHERE  commission_id=?`,
            [
                data.commision_rate,
                data.commission_id,
                
            ],
            (err,results,fields) =>{
                if(err){
                    return callback(err)
                }
                return callback(null,results);

            }
        )
    }
}