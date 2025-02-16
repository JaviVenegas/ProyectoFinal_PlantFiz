const { DB } = require("../config/db");
const pgFormat = require('pg-format');

const getUserById = async (correo) => {
    try {
        const SQLQuery = pgFormat(
            `SELECT correo, id FROM usuarios
            WHERE correo = %L`,
            correo
        );

        const result = await DB.query(SQLQuery);
        return result.rows[0] || null;
    } catch (error) {
        throw error;
    }
};

const getDirections = async (id_usuario) => {
    try {
        const SQLQuery = pgFormat(
            `SELECT id_usuario, id, direccion, ciudad, region, codigo_postal FROM direcciones
            WHERE id_usuario = %L`,
            id_usuario
        );

        const result = await DB.query(SQLQuery);
        return result.rows || null;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getUserById,
    getDirections
};