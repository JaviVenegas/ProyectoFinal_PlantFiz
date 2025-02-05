const { DB } = require("../config/db");
const pgFormat = require('pg-format');

const authenticateUser = async (email) => {
    try {
        const SQLQuery = pgFormat(
            `SELECT * FROM usuarios
            WHERE email = %L`,
            email
        );

        const result = await DB.query(SQLQuery);

        if (!result.rowCount) throw new Error('USER_NOT_FOUND');
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const getUser = async (email) => {
    try {
        const result = await DB.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        return result.rows[0];

    } catch (error) {
        throw error;
    }
};

const createUser = async (rut, nombre, apellido, correo, hashedPassword, rol = 'user', telefono) => {
    try {
        const SQLQuery = `
            INSERT INTO usuarios (rut, nombre, apellido, correo, contrasena, rol, telefono)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
            RETURNING *
        `;

        const result = await DB.query(SQLQuery, [rut, nombre, apellido, correo, hashedPassword, rol, telefono]);
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