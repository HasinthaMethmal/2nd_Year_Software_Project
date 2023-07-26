const mysql=require("mysql")
require('dotenv').config()

const dbConfig=mysql.createConnection({
    host: process.env.DB_HOST,
    database:process.env.DB_DATABASE,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD
})
dbConfig.connect((error)=>{
    if(error) throw error
    console.log('Database connected successfully')
})

module.exports=dbConfig