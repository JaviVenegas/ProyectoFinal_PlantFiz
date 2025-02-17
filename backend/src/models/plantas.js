const {DB} = require('../config/db')
const pgFormat = require('pg-format')


//Crear planta para portal admin

const agregarPlanta = async (nombre_planta, precio, origen, descripcion_hojas, ideal_para, agua, luz ) => {
    try {    
        const { rows } = await DB.query(  
            `INSERT INTO plantas (nombre_planta, precio, origen, descripcion_hojas, ideal_para, agua, luz) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,  // El punto y coma no debe estar aquí
            [  // Aquí empieza el array de los valores
                nombre_planta,
                precio,
                origen,
                descripcion_hojas,
                ideal_para,
                agua,
                luz
            ]
        );

        if (rows === 0) {
            throw new Error('PLANT_REGISTER_ERROR');
        }
        return rows[0];

    } catch (error) {
        throw error;
    }
};

//Obtener todos las plantas con paginacion y orden para portal catalogo 
const obtenerPlantas = async ( limit = 12 ) => { 
    try {
        const SQLQuery = 
            `SELECT * FROM plantas limit $1`
        const SQLValues = [limit]

        const { rows } = await DB.query(SQLQuery, SQLValues)
        return rows


    } catch (error) {
        console.error("Error al obtener plantas:", error);
        throw error
    }
    
}
//obtener planta por id para detalle de producto 
const ObtenerPlantaPorId = async (id) => {
    try {
        const SQLQuery = 
            `SELECT * FROM plantas WHERE id = $1`
        const SQLValues = [id]
        const { rows }= await DB.query(SQLQuery, SQLValues)    

        console.log(rows)
        return rows [0];// El 0 hace que retorne solo 1 pregunta en lugar de array de plantas
    } catch (error) {
        throw error
    }
}

//Editar planta para portal admin 
const editarPlanta = async (id, cambios) => {
    try {
        // Obtener los campos y valores de los cambios
        const campos = Object.keys(cambios);
        const valores = Object.values(cambios);

        // Construcción dinámica de la cláusula SET para la consulta
        const setClause = campos.map((campo, index) => `${campo} = $${index + 1}`).join(", ");

        // Crear la consulta SQL para actualizar
        const query = `UPDATE plantas SET ${setClause} WHERE id = $${campos.length + 1} RETURNING *`;

        // Ejecutar la consulta en la base de datos
        const { rows } = await DB.query(query, [...valores, id]);

        return rows[0]; // Retorna el objeto actualizado
    } catch (error) {
        throw error; // Si ocurre un error, se lanza una excepción
    }
};



//Eliminar planta en portal admin
const eliminarPlanta = async (id) => {
    try {    
        const SQLQuery = `DELETE FROM plantas WHERE id = $1 RETURNING *`;
        const SQLValues = [id]
       
        const { rows } = await DB.query(SQLQuery, SQLValues)


        if (rows.length === 0) {
            throw new Error('PLANT_DELETE_ERROR');
        }
        return rows[0];

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





