const { DB } = require("../config/db");
const pgFormat = require('pg-format');

const authenticateUser = async (correo) => {
    try {
        const SQLQuery = pgFormat(
            `SELECT correo, contrasena, rol FROM usuarios
            WHERE correo = %L`,
            correo
        );

        const result = await DB.query(SQLQuery);
        return result.rows[0] || null;
    } catch (error) {
        throw error;
    }
};

const getUser = async (correo) => {
    try {
        const result = await DB.query('SELECT rut, nombre, apellido, correo, telefono FROM usuarios WHERE correo = $1', [correo]);
        return result.rows[0] || null;
    } catch (error) {
        throw error;
    }
};

const createUser = async (rut, nombre, apellido, correo, contrasena, telefono, rol = 'user') => {
    try {
        const SQLQuery = `
            INSERT INTO usuarios (rut, nombre, apellido, correo, contrasena, telefono, rol)
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING rut, nombre, apellido, correo, telefono, rol
        `;

        const result = await DB.query(SQLQuery, [rut, nombre, apellido, correo, contrasena, telefono, rol]);

        if (!result.rowCount) throw new Error('REGISTER_ERROR');

        return result.rows[0];

    } catch (error) {
        throw error;
    }
};

const updateUser = async (rut, nombre, apellido, telefono, correo) => {
    try {

        const SQLQuery = await handleUpdateFilters(rut, nombre, apellido, telefono, correo);

        const result = await DB.query(SQLQuery);

        if (!result.rowCount) throw new Error('UPDATE_USER_ERROR');
        return result.rows[0];

    } catch (error) {
        throw error;
    }
};

const handleUpdateFilters = async (rut, nombre, apellido, telefono, correo) => {
    try {
        let filtros = [];
        let returnValues = [];

        if (rut) {
            filtros.push(pgFormat("rut = %L", rut));
            returnValues.push('rut');
        }
        if (nombre) {
            filtros.push(pgFormat("nombre = %L", nombre));
            returnValues.push('nombre');
        }
        if (apellido) {
            filtros.push(pgFormat("apellido = %L", apellido));
            returnValues.push('apellido');
        }
        if (telefono) {
            filtros.push(pgFormat("telefono = %L", telefono));
            returnValues.push('telefono');
        }

        if (filtros.length === 0) {
            throw new Error('NO_FILTERS');
        }

        const queryUpdate = pgFormat(
            "UPDATE usuarios SET %s WHERE correo = %L RETURNING %s",
            filtros.join(", "),
            correo,
            returnValues.join(", ")
        );

        return queryUpdate;
    } catch (error) {
        throw error;
    }
};

const getUserPassword = async (correo) => {
    try {
        const result = await DB.query('SELECT contrasena FROM usuarios WHERE correo = $1', [correo]);
        return result.rows[0]?.contrasena || null;
    } catch (error) {
        throw error;
    }
};

const updateUserPassword = async (correo, hashedNewPassword) => {
    try {
        const SQLQuery = `
            UPDATE usuarios
            SET contrasena = $2
            WHERE correo = $1
        `;

        const result = await DB.query(SQLQuery, [correo, hashedNewPassword]);

        return result.rows[0];

    } catch (error) {
        throw error;
    }
}

const deleteUser = async (correo) => {
    try {
        const result = await DB.query('DELETE FROM usuarios WHERE correo = $1', [correo]);
        return result.rows[0];

    } catch (error) {
        throw error;
    }
};

module.exports = {
    authenticateUser,
    getUser,
    createUser,
    updateUser,
    getUserPassword,
    updateUserPassword,
    deleteUser
};