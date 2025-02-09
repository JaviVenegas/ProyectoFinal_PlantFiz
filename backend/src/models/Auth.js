const { DB } = require("../config/db");
const pgFormat = require('pg-format');

const authenticateUser = async (correo) => {
    try {
        const SQLQuery = pgFormat(
            `SELECT correo, contrasena FROM usuarios
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
        const result = await DB.query('SELECT rut, nombre, apellido, correo, telefono FROM usuarios WHERE correo = $1', [correo]);
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
            RETURNING rut, nombre, apellido, correo, telefono
        `;

        const result = await DB.query(SQLQuery, [rut, nombre, apellido, correo, contrasena, telefono, rol]);
        return result.rows[0];

    } catch (error) {
        throw error;
    }
};

const updateUser = async (rut, nombre, apellido, correoNuevo, telefono, correoAnterior) => {
    try {

        const SQLQuery = await handleUpdateFilters(rut, nombre, apellido, correoNuevo, telefono, correoAnterior);

        const result = await DB.query(SQLQuery);
        return result.rows[0];

    } catch (error) {
        throw error;
    }
};

const handleUpdateFilters = async (rut, nombre, apellido, correoNuevo, telefono, correoAnterior) => {
    try {
        let filtros = [];
        let returnValues = [];

        if (rut) filtros.push(`rut = '${rut}'`) && returnValues.push('rut');
        if (nombre) filtros.push(`nombre = '${nombre}'`) && returnValues.push('nombre');
        if (apellido) filtros.push(`apellido = '${apellido}'`) && returnValues.push('apellido');
        if (correoNuevo) filtros.push(`correo = '${correoNuevo}'`) && returnValues.push('correo');
        if (telefono) filtros.push(`telefono = '${telefono}'`) && returnValues.push('telefono');

        let queryUpdate = "UPDATE usuarios SET ";
        let returnValuesString = returnValues.join(', ');

        if (filtros.length > 0) {
            queryUpdate += filtros.join(', ');
            queryUpdate += ` 
            WHERE correo = '${correoAnterior}'
            RETURNING ${returnValuesString};
            `;
        }

        return queryUpdate;

    } catch (error) {
        throw error;
    }
};

const getUserPassword = async (correo) => {
    try {
        const result = await DB.query('SELECT contrasena FROM usuarios WHERE correo = $1', [correo]);
        return result.rows[0];

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