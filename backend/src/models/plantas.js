
const { DB } = require("../config/db");
const  format  = require("pg-format");


// Crear planta para portal admin
const agregarPlanta = async (
  nombre_planta,
  precio,
  origen,
  descripcion_hojas,
  ideal_para,
  agua,
  luz,
  cantidad,
  imagen_url
) => {
  const client = await DB.connect(); // Obtener una conexión individual desde el pool

  try {
    await client.query("BEGIN"); // Iniciar la transacción

    // Insertar la planta en la tabla `plantas`
    const { rows } = await client.query(
      `INSERT INTO plantas (nombre_planta, precio, origen, descripcion_hojas, ideal_para, agua, luz) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [nombre_planta, precio, origen, descripcion_hojas, ideal_para, agua, luz]
    );

    if (!rows || rows.length === 0) {
      throw new Error("PLANT_REGISTER_ERROR");
    }

    const id_planta = rows[0].id; // Obtener el ID de la planta insertada

    // Insertar el stock en stock_plantas
    const { rowCount } = await client.query(
      `INSERT INTO stock_plantas (id_planta, cantidad) VALUES ($1, $2)`,
      [id_planta, cantidad]
    );

    if (rowCount === 0) {
      throw new Error("STOCK_REGISTER_ERROR");
    }

    // Insertar el stock en imagenes_plantas`
    const { rowCount: imagen } = await client.query(
      `INSERT INTO imagenes_plantas (id_planta, imagen_url) VALUES ($1, $2)`,
      [id_planta, imagen_url]
    );

    if (imagen === 0) {
      throw new Error("IMAGEN_REGISTER_ERROR");
    }
    await client.query("COMMIT"); // Confirmar la transacción
    return {
      id_planta,
      rowCount,
      rows,
      message: "Planta registrada con stock",
    };
  } catch (error) {
    await client.query("ROLLBACK"); // Revertir cambios si hay error
    throw error;
  } finally {
    client.release(); // Liberar la conexión
  }
};

//Obtener todos las plantas con paginacion y orden para portal catalogo
const obtenerPlantas = async (limit = 12,  order_by = "id_ASC", page = 1) => {

  try {
    const [campo, direccion] = order_by.split('_');
    const offset = Math.abs(( page - 1) * limit);

    console.log( offset );
    
    const SQLQuery = format(`
              SELECT p.*, s.cantidad, i.imagen_url
              FROM plantas p
              LEFT JOIN stock_plantas s ON p.id = s.id_planta
              LEFT JOIN imagenes_plantas i ON p.id = i.id_planta 
              ORDER BY %s %s
              LIMIT %s
              OFFSET %s`, 
              campo, 
              direccion, 
              limit, 
              offset
        );


    console.log("📌 Consulta SQL:", SQLQuery)
    
    const {rows, rowCount} = await DB.query(SQLQuery);
    const { rowCount: count} = await DB.query(`SELECT * FROM plantas`);

    return  {
            rows,
            rowCount,
            pages: Math.ceil(count / limit)
          }

  } catch (error) {
    throw error;
  }
};

//Obtener plantas por filtros 

const obtenerPlantasPorFiltros = async (precio_min, precio_max) => {

  try {
  let filtros = []
  if (precio_max) filtros.push(`precio <= ${precio_max}`)
  if (precio_min) filtros.push(`precio >= ${precio_min}`)
let consulta = "SELECT * FROM plantas"
if (filtros.length > 0) {
filtros = filtros.join(" AND ")
consulta += ` WHERE ${filtros}`
}
const { rows: medicamentos } = await pool.query(consulta)
return medicamentos
} catch (error) {
    throw error;
  }
};

const handleGetFilters = async (precio_min = '', precio_max = '') => {
  
    let filtros = [];
    if (precio_max) filtros.push(`precio <= ${precio_max}`);
    if (precio_min) filtros.push(`precio >= ${precio_min}`);
    let consulta = "SELECT * FROM plantas";
    if (filtros.length > 0) {
      filtros = filtros.join(" AND ");
      consulta += ` WHERE ${filtros}`;
    }
};

//obtener planta por id para detalle de producto
const ObtenerPlantaPorId = async (id) => {
  try {
    const SQLQuery = `   SELECT p.*, s.cantidad, i.imagen_url 
            FROM plantas p
            LEFT JOIN stock_plantas s ON p.id = s.id_planta
            LEFT JOIN imagenes_plantas i ON p.id = i.id_planta
            WHERE p.id = $1
        `;
    const SQLValues = [id];
    const { rows } = await DB.query(SQLQuery, SQLValues);

    return rows[0]; // El 0 hace que retorne solo 1 pregunta en lugar de array de plantas
  } catch (error) {
    throw error;
  }
};

const editarPlanta = async (id, cambios) => {
  try {
    // Validar el ID
    if (!id || isNaN(id)) {
      throw new Error("ID no válido o no proporcionado");
    }

    // Extraer 'cantidad' e 'imagen_url' y dejar el resto de los cambios
    const { cantidad, imagen_url, ...otrosCambios } = cambios;
    const campos = Object.keys(otrosCambios);
    const valores = Object.values(otrosCambios);

    let plantaActualizada;

    // Si hay campos para actualizar en la tabla 'plantas'
    if (campos.length > 0) {
      const setClause = campos
        .map((campo, i) => `${campo.trim()} = $${i + 1}`)
        .join(", ");
      const SQLQuery = `UPDATE plantas SET ${setClause} WHERE id = $${
        campos.length + 1
      } RETURNING *`;
      const { rows } = await DB.query(SQLQuery, [...valores, id]);
      plantaActualizada = rows[0];
    } else {
      // Si no hay cambios para 'plantas', obtener la planta sin modificarla
      const { rows } = await DB.query("SELECT * FROM plantas WHERE id = $1", [
        id,
      ]);
      plantaActualizada = rows[0];
    }

    // Actualizar la tabla 'stock_plantas' si se proporcionó un nuevo valor para 'cantidad'
    if (cantidad !== undefined) {
      const updateStockQuery = `
                UPDATE stock_plantas 
                SET cantidad = $1 
                WHERE id_planta = $2
                RETURNING *;
            `;
      await DB.query(updateStockQuery, [cantidad, id]);
    }

    // Actualizar la imagen si se proporcionó un nuevo valor para 'imagen_url'
    if (imagen_url !== undefined) {
      const updateImagenQuery = `
                UPDATE imagenes_plantas
                SET imagen_url = $1 
                WHERE id_planta = $2
                RETURNING *;
            `;
      await DB.query(updateImagenQuery, [imagen_url, id]);
    }

    return plantaActualizada;
  } catch (error) {
    throw error;
  }
};

//Eliminar planta en portal admin
const eliminarPlanta = async (id) => {
  try {
    await DB.query(`DELETE FROM stock_plantas WHERE id_planta = $1`, [id]);
    await DB.query(`DELETE FROM imagenes_plantas WHERE id_planta = $1`, [id]);
    const SQLQuery = `DELETE FROM plantas WHERE id = $1 RETURNING *`;
    const SQLValues = [id];

    const { rows } = await DB.query(SQLQuery, SQLValues);

    if (rows.length === 0) {
      throw new Error("PLANT_DELETE_ERROR");
    }
    return rows[0];
  } catch (error) {
    throw error;
  }
};

//Verificar si la planta existe
const existe = async (id) => {
  try {
    const SQLQuery = `SELECT 1 FROM plantas WHERE id = $1`;
    const SQLValues = [id];

    const { rowCount } = await DB.query(SQLQuery, SQLValues);
    return rowCount > 0;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  obtenerPlantas,
  agregarPlanta,
  editarPlanta,
  eliminarPlanta,
  ObtenerPlantaPorId,
  existe,
};
