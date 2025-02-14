const { signToken } = require('../helpers/jwt');
const Auth = require('../models/Auth');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res, next) => {
    try {
        const { correo, contrasena } = req.body;

        const userExists = await Auth.authenticateUser(correo);
        if (!userExists) {
            throw new Error('USER_NOT_FOUND');
        }

        const match = await bcrypt.compare(contrasena, userExists.contrasena);
        if (!match) {
            throw new Error('CREDENTIALS_ERROR');
        }

        const data = { correo };
        const token = signToken(data);
        res.json({ token });

    } catch (error) {
        next(error);
    }
};

const handleRegister = async (req, res, next) => {
    try {
        const { rut, nombre, apellido, correo, contrasena, telefono, rol } = req.body;

        const emailExists = await Auth.getUser(correo);
        if (emailExists) {
            throw new Error('EMAIL_ALREADY_EXISTS');
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const newUser = await Auth.createUser(rut, nombre, apellido, correo, hashedPassword, telefono, rol);

        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });

    } catch (error) {
        next(error);
    }
};

const handleGetUser = async (req, res, next) => {
    try {
        const { correo } = req.user;
        const user = await Auth.getUser(correo);
        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }

        res.status(200).json({ message: 'Usuario obtenido con éxito', data: user });

    } catch (error) {
        next(error);
    }
};

const handleUpdateUser = async (req, res, next) => {
    try {
        const { rut, nombre, apellido, telefono } = req.body;
        const { correo } = req.user;

        const userExists = await Auth.getUser(correo);
        if (!userExists) {
            throw new Error('USER_NOT_FOUND');
        }

        const updatedUser = await Auth.updateUser(rut, nombre, apellido, telefono, correo);
        res.status(200).json({ message: 'Usuario actualizado con éxito', data: updatedUser });

    } catch (error) {
        next(error);
    }
};

const handleChangePassword = async (req, res, next) => {
    try {
        const { correo } = req.user;
        const { contrasenaActual, contrasenaNueva, confirmacionContrasenaNueva } = req.body;
        
        const userExists = await Auth.getUser(correo);
        const userData = await Auth.getUserPassword(correo);

        if (!userExists) {
            throw new Error('USER_NOT_FOUND');
        }

        if (contrasenaNueva !== confirmacionContrasenaNueva) {
            throw new Error('PASSWORD_CONFIRMATION_MISMATCH');
        }

        const matchPassword = await bcrypt.compare(contrasenaActual, userData);
        if (!matchPassword) {
            throw new Error('INVALID_CURRENT_PASSWORD');
        }
        
        const hashedNewPassword = await bcrypt.hash(contrasenaNueva, 10);
        const updatedUser = await Auth.updateUserPassword(correo, hashedNewPassword);
        res.status(200).json({ message: 'Contraseña actualizada con éxito', data: updatedUser });

    } catch (error) {
        next(error);
    }
};

const handleDeleteUser = async (req, res, next) => {
    try {
        const { correo } = req.user;
        const userExists = await Auth.getUser(correo);
        if (!userExists) {
            throw new Error('USER_NOT_FOUND');
        }

        const deletedUser = await Auth.deleteUser(correo);
        res.status(200).json({ message: 'Usuario eliminado con éxito', data: deletedUser });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleLogin,
    handleRegister,
    handleGetUser,
    handleUpdateUser,
    handleChangePassword,
    handleDeleteUser
};
