const { signToken } = require('../helpers/jwt');
const Auth = require('../models/Auth')
const bcrypt = require('bcrypt');

const handleLogin = async (req, res, next) => {
    try {
        console.log('hola');
        const { correo, contrasena } = req.body;

        console.log(req.body);

        const userExists = await Auth.authenticateUser(correo);
        if (!userExists) {
            res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        const match = await bcrypt.compare(contrasena, userExists.contrasena);
        if (!match) {
            res.status(401).json({ msg: 'Credenciales incorrectas' });
        } else {
            const data = {
                email
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
        const { correo } = req.user; // Email extraido desde el token, hay que consologearlo para ver que data hay 
        const user = await Auth.getUser(correo);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleLogin,
    handleRegister,
    handleGetUser
}