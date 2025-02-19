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

        
        return rows [0];// El 0 hace que retorne solo 1 pregunta en lugar de array de plantas
    } catch (error) {
        throw error
    }
}

//Editar planta para portal admin 
const editarPlantatt = async (id, nombre_planta, precio, origen, descripcion_hojas, ideal_para, agua, luz) => {
    try {    
        const SQLQuery = `UPDATE plantas SET 
            nombre_planta = $1,
            precio = $2,
            origen = $3, 
            descripcion_hoja = $4, 
            ideal_para = $5,
            agua = $6, 
            luz = $7
        WHERE id = $8 RETURNING *`;
        const values = [      
            nombre_planta,
            precio,
            origen,
            descripcion_hojas,
            ideal_para,
            agua,
            luz, 
            id
        ]
        
        const result = await DB.query(SQLQuery,values);

        return result.rows[0]; // Devuelve el objeto actualizado
    } catch (error) {
    
        throw error;
    }
};

const editarPlanta = async (id, cambios) => {
    try {
        if (!id || isNaN(id)) {
            throw new Error("ID no válido o no proporcionado");
        }

        const campos = Object.keys(cambios);
        const valores = Object.values(cambios);

        if (campos.length === 0) {
            throw new Error("No se proporcionaron cambios");
        }

        // Construye la consulta SQL de manera segura
        const setClause = campos.map((campo, i) => `${campo.trim()} = $${i + 1}`).join(", ");
        const SQLQuery = `UPDATE plantas SET ${setClause} WHERE id = $${campos.length + 1} RETURNING *`;



        // Ejecuta la consulta en la BD
        const { rows } = await DB.query(SQLQuery, [...valores, id]);

        return rows[0]; // Retorna la planta actualizada
    } catch (error) {
        throw error;
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





