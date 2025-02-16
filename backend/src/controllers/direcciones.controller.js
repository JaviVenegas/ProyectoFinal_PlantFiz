const { signToken } = require('../helpers/jwt');
const Direcciones = require('../models/Direcciones');

const handleGetDirections = async (req, res, next) => {
    try {
        const { correo } = req.user;

        const user = await Direcciones.getUserById(correo);
        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }

        const directions = await Direcciones.getDirections(user.id);
        
        res.status(200).json({ message: 'Direcciones obtenidas con éxito', data: directions });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleGetDirections
};