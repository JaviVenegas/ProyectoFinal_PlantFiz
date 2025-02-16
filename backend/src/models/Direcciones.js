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

const createDirection = async (id_usuario, direccion, ciudad, region, codigo_postal) => {
    try {
        const SQLQuery = pgFormat(
            `INSERT INTO direcciones (id_usuario, direccion, ciudad, region, codigo_postal)
            VALUES (%L, %L, %L, %L, %L)
            RETURNING *`,
            id_usuario,
            direccion,
            ciudad,
            region,
            codigo_postal
        );

        const result = await DB.query(SQLQuery);
        return result.rows[0] || null;
    } catch (error) {
        throw error;
    }
};

const updateDirection = async (id, direccion, ciudad, region, codigo_postal) => {
    try {
        const SQLQuery = pgFormat(
            `UPDATE direcciones
            SET direccion = %L, ciudad = %L, region = %L, codigo_postal = %L
            WHERE id = %L
            RETURNING *`,
            direccion,
            ciudad,
            region,
            codigo_postal,
            id
        );

        const result = await DB.query(SQLQuery);
        return result.rows[0] || null;

    } catch (error) {
        throw error;
    }
};

const deleteDirection = async (id) => {
    try {
        const SQLQuery = pgFormat(
            `DELETE FROM direcciones
            WHERE id = %L
            RETURNING *`,
            id
        );

        const result = await DB.query(SQLQuery);
        return result.rows[0] || null;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getUserById,
    getDirections,
    createDirection,
    updateDirection,
    deleteDirection
};