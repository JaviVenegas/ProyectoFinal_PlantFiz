const { DB } = require("../config/db");
const pgFormat = require('pg-format');

const authenticateUser = async (correo) => {
    try {
        const SQLQuery = pgFormat(
            `SELECT * FROM usuarios
            WHERE correo = %L`,
            correo
        );

        const result = await DB.query(SQLQuery);

        if (!result.rowCount) throw new Error('USER_NOT_FOUND');
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const getUser = async (correo) => {
    try {
        const result = await DB.query('SELECT * FROM usuarios WHERE email = $1', [correo]);
        return result.rows[0];

    } catch (error) {
        throw error;
    }
};

const createUser = async (rut, nombre, apellido, correo, contrasena, telefono, rol = 'user') => {
    try {
        const SQLQuery = `
            INSERT INTO usuarios (rut, nombre, apellido, correo, contrasena, telefono, rol)
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *
        `;

        const result = await DB.query(SQLQuery, [rut, nombre, apellido, correo, contrasena, telefono, rol]);
        return result.rows[0];

    } catch (error) {
        throw error;
    }
};

module.exports = {
    authenticateUser,
    getUser,
    createUser
};