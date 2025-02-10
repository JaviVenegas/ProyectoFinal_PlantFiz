require('dotenv').config()
const { Pool } = require('pg')  //conecta a node con postgres, pool permite hacer multiconexiones y mejor rendimiento en las consultas. 
const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env
 
const DB = new Pool(
    {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        allowExitOnIdle: true
    }
)

module.exports = {
    DB
}