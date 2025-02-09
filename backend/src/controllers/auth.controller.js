const { signToken } = require('../helpers/jwt');
const Auth = require('../models/Auth')
const bcrypt = require('bcrypt');

const handleLogin = async (req, res, next) => {
    try {
        const { correo, contrasena } = req.body;

        const userExists = await Auth.authenticateUser(correo);
        if (!userExists) {
            res.status(404).json({ msg: 'Usuario no encontrado' });
            return;
        }

        const match = await bcrypt.compare(contrasena, userExists.contrasena);
        if (!match) {
            res.status(401).json({ msg: 'Credenciales incorrectas' });
        } else {
            const data = {
                correo
            };
            const token = signToken(data);
            res.json({ token });
        }

    } catch (error) {
        next(error);
    }
};

const handleRegister = async (req, res, next) => {
    try {
        const { rut, nombre, apellido, correo, contrasena, telefono, rol } = req.body;

        const emailExists = await Auth.getUser(correo);

        //ESTO TENGO QUE PASARLO A LOS CODIGOS DE ESTATUS DEL MIDDLEWARE
        if (emailExists) {
            res.status(409).json({ msg: 'El correo ya ha sido registrado' }); // estos errores tengo que abstraerlos
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const newUser = await Auth.createUser(rut, nombre, apellido, correo, hashedPassword, telefono, rol);
        res.status(201).send({ message: 'Usuario creado con éxito', user: newUser });

    } catch (error) {
        next(error);
    }
};


const handleGetUser = async (req, res, next) => {
    try {
        const { correo } = req.user;
        const user = await Auth.getUser(correo);

        res.status(200).json({
            message: 'Usuario obtenido con éxito',
            data: user
        });

    } catch (error) {
        next(error);
    }
};

const handleUpdateUser = async (req, res, next) => {
    try {
        const { rut, nombre, apellido, correoNuevo, telefono, correoAnterior } = req.body;
        const { correo } = req.user;

        const userExists = await Auth.getUser(correoAnterior);
        if (!userExists) {
            res.status(404).json({ msg: 'Usuario no encontrado' });
            return;
        }

        if (correo === correoAnterior) {
            const updatedUser = await Auth.updateUser(rut, nombre, apellido, correoNuevo, telefono, correoAnterior);
            res.status(200).json({
                message: 'Usuario actualizado con éxito',
                data: updatedUser
            });
        } else {
            res.status(401).json({ msg: 'No tienes permiso para actualizar este usuario' });
        }

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
            res.status(404).json({ msg: 'Usuario no encontrado' });
            return;
        }

        if (contrasenaNueva !== confirmacionContrasenaNueva) {
            res.status(405).json({ msg: 'La contraseña actual y la de confirmación no coinciden' });
            return;
        }

        const matchPassword = await bcrypt.compare(contrasenaActual, userData.contrasena);

        if (!matchPassword) {
            res.status(401).json({ msg: 'La contraseña actual es incorrecta' });
            return;
        } else {
            const hashedNewPassword = await bcrypt.hash(contrasenaNueva, 10);
            const updatedUser = await Auth.updateUserPassword(correo, hashedNewPassword);
            res.status(200).json({
                message: 'Contraseña actualizada con suceeso',
                data: updatedUser
            });
        }

    } catch (error) {
        next(error);
    }
};

const handleDeleteUser = async (req, res, next) => {
    try {
        const { correo } = req.user;
        const userExists = await Auth.getUser(correo);
        if (!userExists) {
            res.status(404).json({ msg: 'Usuario no encontrado' });
            return;
        }

        const deletedUser = await Auth.deleteUser(correo);
        res.status(200).json({
            message: 'Usuario eliminado con éxito',
            data: deletedUser
        });

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
}