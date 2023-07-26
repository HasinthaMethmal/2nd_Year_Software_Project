const {createConnection} = require('mysql');
require('dotenv').config();

const db = createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
);

module.exports=db;
//env doesnot work properly here should manually assign db parameters