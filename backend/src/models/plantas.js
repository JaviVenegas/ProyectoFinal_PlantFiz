const {DB} = require('../config/db')
const pgFormat = require('pg-format')


//Crear planta para portal admin
const agregarPlanta = async (nomnre_planta, precio, origen, descripcion_hojas, ideal_para, agua, luz ) => {
    try {    
        const SQLQuery = pgFormat(
            `INSERT INTO plantas (nombre_planta, precio, origen, descripcion_hojas, ideal_para, agua, luz)
            VALUES (%L, %L, %L, %L, %L, %L, %L)`,
            nomnre_planta,
            precio,
            origen,
            descripcion_hojas,
            ideal_para,
            agua,
            luz
        )
        const result = await DB.query(SQLQuery)
        return { rows: result.rows, rowCount: result.rowCount };

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
        const SQLQuery = pgFormat(
            `DELETE FROM plantas WHERE id = %L`,
            id
        )    
        const result = await DB.query(SQLQuery)
        return { rows: result.rows, rowCount: result.rowCount };

    } catch (error) {
        throw error
    }
}


module.exports = {
    obtenerPlantas,
    agregarPlanta, 
    editarPlanta,
    eliminarPlanta, 
    ObtenerPlantaPorId
}


