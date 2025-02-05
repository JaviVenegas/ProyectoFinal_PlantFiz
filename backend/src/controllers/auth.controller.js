const { signToken } = require('../helpers/jwt');
const Auth = require('../models/Auth')
const bcrypt = require('bcrypt');

const handleLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userExists = await Auth.authenticateUser(email);
        if (!userExists) {
			res.status(404).json({ msg: 'Usuario no encontrado' });
		}

        const match = await bcrypt.compare(password, userExists.password);
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
        const { email, rut, nombre, apellido, correo, contrasena, rol, telefono } = req.body;

        console.log(req.body);


        const userExists = await Auth.authenticateUser(email);
        if (userExists) {
            res.status(409).json({ msg: 'El correo ya ha sido registrado' });
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10);

        const newUser = await Auth.createUser(rut, nombre, apellido, correo, hashedPassword, rol, telefono);
        res.status(201).send({ message: 'Usuario creado con éxito', user: newUser });

    } catch (error) {
        next(error);
    }
};


const handleGetUser = async (req, res, next) => {
    try {
        const { email } = req.user; // Email extraido desde el token, hay que consologearlo para ver que data hay 
        const user = await Auth.getUser(email);
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