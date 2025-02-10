// Funciones del modelo Auth a testear

const {
    authenticateUser,
    getUser,
    createUser,
    updateUser,
    getUserPassword,
    updateUserPassword,
    deleteUser
} = require('../../src/models/Auth');

// Copia de la base de datos y Mock de la misma
const { DB } = require('../../src/config/db');
jest.mock('../../src/config/db');

// Definir un mock de testing 

describe('AUTH MODEL TESTS', () => {

    test('Autenticar usuario - Usuario correcto', async () => {
        const correo = 'F7A5H@example.com';
        const contrasena = '12345678';

        let userMock = {
            id: 1,
            correo,
            contrasena
        }

        DB.query.mockResolvedValue({ rows: [userMock], rowCount: 1 });

        const result = await authenticateUser(correo, contrasena);

        expect(result).toEqual(userMock);
        expect(DB.query).toHaveBeenCalledTimes(1);
    });

    test('Autenticar usuario - Usuario no encontrado', async () => {
        const correo = 'F7A5H@example.com';
        const contrasena = '12345678';

        DB.query.mockResolvedValue({ rows: [], rowCount: 0 });

        await expect(authenticateUser(correo, contrasena)).rejects.toThrow('USER_NOT_FOUND');
    });
});
