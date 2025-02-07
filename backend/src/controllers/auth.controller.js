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
        res.json(user); // toda la data del usuario
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleLogin,
    handleRegister,
    handleGetUser
}