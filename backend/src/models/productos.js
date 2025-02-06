const {BD} = require('../config/db')
const pgFormat = require('pg-format')

//Obtener todos los productos con paginacion y orden 
const getProductos = async (limit = 12, order_by = 'id_ASC', page = 1) => { 
    try {
        const SQLQuery = pgFormat(
            `SELECT * FROM productos 
            ORDER BY ${order_by}
            LIMIT %L
            OFFSET %L`,
            limit,
            (page - 1) * limit
        )
        const result = await BD.query(SQLQuery)
        return result.rows
    } catch (error) {
        throw error
    }
    
}

const postProducto = async (producto) => {