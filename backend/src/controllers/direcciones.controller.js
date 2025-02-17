const Direcciones = require('../models/Direcciones');

const handleGetDirections = async (req, res, next) => {
    try {
        const { correo } = req.user;

        const user = await Direcciones.getUserById(correo);
        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }

        const directions = await Direcciones.getDirections(user.id);
        res.status(200).json({ message: 'Direcciones obtenidas con éxito', directions });

    } catch (error) {
        next(error);
    }
};

const handleCreateDirection = async (req, res, next) => {    
    try {
        const { direccion, ciudad, region, codigo_postal } = req.body;
        const { correo } = req.user;

        const user = await Direcciones.getUserById(correo);
        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }

        const newDirection = await Direcciones.createDirection(user.id, direccion, ciudad, region, codigo_postal);
        res.status(200).json({ message: 'Dirección creada con éxito', data: newDirection });

    } catch (error) {
        next(error);
    }
}

const handleUpdateDirection = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { direccion, ciudad, region, codigo_postal } = req.body;
        const { correo } = req.user;

        const user = await Direcciones.getUserById(correo);
        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }

        const updatedDirection = await Direcciones.updateDirection(id, direccion, ciudad, region, codigo_postal);
        res.status(200).json({ message: 'Dirección actualizada con éxito', data: updatedDirection });

    } catch (error) {
        next(error);
    }
}

const handleDeleteDirection = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { correo } = req.user;

        const user = await Direcciones.getUserById(correo);
        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }

        const deletedDirection = await Direcciones.deleteDirection(id);
        res.status(200).json({ message: 'Dirección eliminada con éxito', data: deletedDirection });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    handleGetDirections,
    handleCreateDirection,
    handleUpdateDirection,
    handleDeleteDirection
};