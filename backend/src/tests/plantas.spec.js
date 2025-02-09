const request = require("supertest");
const app = require("..src/index");

describe("Operaciones CRUD de productos plantas", () => {


    //Test de GET/plantas
    it ("devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
        const responseGet = await request (app).get("/plantas");   //donde se hace la consulta 
        expect (responseGet.statusCode).toBe(200);    /// el status code es 200
        expect(responseGet.body.length).toBeGreaterThan(0);    //el arreglo tiene por lo menos 1 objeto
    })
    
    it("devuelve un status code 200 y un objeto con la planta solicitada", async () => {
        const responseGet = await request(app).get("/plantas/3");
        expect(responseGet.statusCode).toBe(200);
        
        expect(responseGet.body).toBeInstanceOf(Object);
        
        expect(responseGet.body).toHaveProperty("id", 3);
        expect(responseGet.body).toHaveProperty("nombre");
    });
    

    
    //Test de DELETE/planta
    it ("obtiene un código 404 al intentar eliminar una planta con un id que no existe.", async () => {
        const responseDelete = await request (app).delete("/plantas/15000");   
        expect (responseDelete.statusCode).toBe(404);

        expect(responseDelete.body).toHaveProperty("message", "Planta no encontrada");
    })




    //Test de Patch/planta
    
    it("Enviando un nuevo producto agrega un nuevo café y devuelve un código 201", async () => {
        const nuevoProducto = { id: 10, nombre: "Nuevo producto" };
    
        // solicitud POST para agregar el nuevo café
        const responsePost = await request(app).post("/cafes").send(nuevoProducto);
        expect(responsePost.statusCode).toBe(201);  // Esperamos que el POST responda con 201
    
        // Hacer una solicitud GET para obtener todos los cafés
        const responseGet = await request(app).get("/cafes").send();
        expect(responseGet.statusCode).toBe(200); 
    
        // Verificar que el nuevo café esté presente en la lista
        expect(responseGet.body).toContainEqual(expect.objectContaining(nuevoProducto));
    });

    

    
    //Test de Post/planta
    it("Debe devolver status 400 si el id en parámetros no coincide con el id en el payload", async () => {
        const responsePut = { id: 1, nombre: "Afelandra" };
        const res = await request(app).p("/plantas/1").send(responsePut);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message", "El id del parámetro no coincide con el id del café recibido");
    });
});
