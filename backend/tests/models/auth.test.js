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

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('authenticateUser', () => {

        test('Autenticar usuario - Usuario correcto', async () => {
            const correo = 'correo@correo.com';
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
            const correo = 'correo@correo.com';
            const contrasena = '12345678';

            DB.query.mockResolvedValue({ rows: [], rowCount: 0 });

            await expect(authenticateUser(correo, contrasena)).rejects.toThrow('USER_NOT_FOUND');
        });
    });

    describe('getUser', () => {

        test('Obtener usuario - Usuario encontrado', async () => {
            const correo = 'correo@correo.com';

            let userMock = {
                id: 1,
                correo
            };

            DB.query.mockResolvedValue({ rows: [userMock], rowCount: 1 });

            const result = await getUser(correo);

            expect(result).toEqual(userMock);
            expect(DB.query).toHaveBeenCalledTimes(1);
        });

        test('Obtener usuario - Usuario no encontrado', async () => {
            const correo = 'correo@correo.com';

            DB.query.mockResolvedValue({ rows: [], rowCount: 0 });

            await expect(getUser(correo)).rejects.toThrow('USER_NOT_FOUND');
        });
    });

    describe('createUser', () => {

        test('Crear usuario - Usuario creado', async () => {
            let rut = '12345678-9';
            let nombre = 'nombre';
            let apellido = 'apellido';
            let correo = 'correo@correo.com';
            let contrasena = '12345678';
            let telefono = '12345678';
            let rol = 'user';

            let userMock = {
                rut,
                nombre,
                apellido,
                correo,
                contrasena,
                telefono,
                rol
            };

            DB.query.mockResolvedValue({ rows: [userMock], rowCount: 1 });

            const result = await createUser(rut, nombre, apellido, correo, contrasena, telefono, rol);

            expect(result).toEqual(userMock);
            expect(DB.query).toHaveBeenCalledTimes(1);
        });

        test('Crear usuario - Error al crear usuario', async () => {
            let rut = '12345678-9';
            let nombre = 'nombre';
            let apellido = 'apellido';
            let correo = 'correo@correo.com';
            let contrasena = '12345678';
            let telefono = '12345678';
            let rol = 'user';

            DB.query.mockResolvedValue({ rows: [], rowCount: 0 });

            await expect(createUser(rut, nombre, apellido, correo, contrasena, telefono, rol)).rejects.toThrow('REGISTER_ERROR');
        });
    });

    describe('updateUser', () => {

        test('Actualizar usuario - Usuario actualizado', async () => {
            let rut = '12345678-9';
            let nombre = 'nombre';
            let apellido = 'apellido';
            let correoNuevo = 'prueba@correo.com';
            let telefono = '12345678';
            let correoAnterior = 'correo@correo.com';

            let userMock = {
                rut,
                nombre,
                apellido,
                correoNuevo,
                telefono,
                correoAnterior
            };

            DB.query.mockResolvedValue({ rows: [userMock], rowCount: 1 });

            const result = await updateUser(rut, nombre, apellido, correoNuevo, telefono, correoAnterior);

            expect(result).toEqual(userMock);
            expect(DB.query).toHaveBeenCalledTimes(1);
        });

        test('Actualizar usuario - Error al actualizar usuario', async () => {
            let rut = '12345678-9';
            let nombre = 'nombre';
            let apellido = 'apellido';
            let correoNuevo = 'prueba@correo.com';
            let telefono = '12345678';
            let correoAnterior = 'correo@correo.com';

            DB.query.mockResolvedValue({ rows: [], rowCount: 0 });

            await expect(updateUser(rut, nombre, apellido, correoNuevo, telefono, correoAnterior)).rejects.toThrow('UPDATE_USER_ERROR');
        });
    });

    describe('getUserPassword', () => {

        test('Obtener contraseña de usuario - Contraseña obtenida', async () => {
            const correo = 'correo@correo.com';

            let userMock = {
                contrasena: '12345678'
            };

            DB.query.mockResolvedValue({ rows: [userMock], rowCount: 1 });

            const result = await getUserPassword(correo);

            expect(result).toEqual(userMock);
            expect(DB.query).toHaveBeenCalledTimes(1);
        });
    });

});