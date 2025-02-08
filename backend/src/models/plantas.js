const {DB} = require('../config/db')
const pgFormat = require('pg-format')


//Crear planta para portal admin
const agregarPlanta = async (nombre_planta, precio, origen, descripcion_hojas, ideal_para, agua, luz ) => {
    try {    
        const SQLQuery = 
            `INSERT INTO plantas (nombre_planta, precio, origen, descripcion_hojas, ideal_para, agua, luz)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const SQLValues = [
            nombre_planta,
            precio,
            origen,
            descripcion_hojas,
            ideal_para,
            agua,
            luz
        ]

        const result = await DB.query(SQLQuery, SQLValues)

        if (result.rowCount === 0) {
            throw new Error('PLANT_REGISTER_ERROR');
        }
        return result.rows[0];

    } catch (error) {
        throw error 
    
    }
}
//Obtener todos las plantas con paginacion y orden para portal catalogo 
const obtenerPlantas = async () => { 
    try {
        const SQLQuery = 
            `SELECT * FROM plantas `

        const result = await DB.query(SQLQuery)
        console.log("Resultados de la consulta:", result.rows);
        return result.rows
    } catch (error) {
        console.error("Error al obtener plantas:", error);
        throw error
    }
    
}
//obtener planta por id para detalle de producto 
const ObtenerPlantaPorId = async (id) => {
    try {
        const SQLQuery = pgFormat(
            `SELECT * FROM plantas WHERE id = %L`,
            id
        )
        const result = await DB.query(SQLQuery)    
        return result.rows [0]; // El 0 hace que retorne solo 1 pregunta en lugar de array de plantas
    } catch (error) {
        throw error
    }
}

//Editar planta para portal admin 
const editarPlanta = async (id, cambios) => {
    try {
        // consulta dinámicamente
        const campos = Object.keys(cambios).map((campo) => `${campo} = %L`).join(", ");
        const valores = Object.values(cambios);

        // Evitar SQL Injection con pgFormat
        const SQLQuery = pgFormat(
            `UPDATE plantas SET ${campos} WHERE id = %L RETURNING *`,
            ...valores,
            id
        );

        const result = await DB.query(SQLQuery);
        return result.rows[0]; // Devuelve el objeto actualizado
    } catch (error) {
        throw error;
    }
};


//Eliminar planta en portal admin
const eliminarPlanta = async (id) => {
    try {    
        const SQLQuery = 
            `DELETE FROM plantas WHERE id = $1 RETURNING *`;
        const SQLValues = [id]
       
        const result = await DB.query(SQLQuery, SQLValues)


        if (result.rowCount === 0) {
            throw new Error('PLANT_DELETE_ERROR');
        }
        return result.rows[0];

    } catch (error) {
        throw error
    }
}

//Verificar si la planta existe
const existe= async (id) => {
    try {    
        const SQLQuery = 
            `SELECT 1 FROM plantas WHERE id = $1`
        const SQLValues = [id]
        
        const {rowCount} = await DB.query(SQLQuery, SQLValues)
        return rowCount > 0;

    } catch (error) {
        throw error
    }
}


module.exports = {
    obtenerPlantas,
    agregarPlanta, 
    editarPlanta,
    eliminarPlanta, 
    ObtenerPlantaPorId, 
    existe
}


