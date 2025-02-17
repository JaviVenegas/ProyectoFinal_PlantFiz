

export const URLBASE = 'http://localhost:3000';


export const ENDPOINT = {

 
// Productos
// Categoria Plantas

    getPlantas: `${URLBASE}/productos/plantas`,          // GET - Obtener todas las plantas
    getPlantaPorId: (id) => `${URLBASE}/productos/planta/${id}`,          // GET - Obtener una planta por id
    agregarPlanta: `${URLBASE}/productos/planta`,          // POST - Crear una planta
    editarPlanta: (id) => `${URLBASE}/productos/planta/${id}`,          // PATCH - Editar una planta
    eliminarPlanta: (id) => `${URLBASE}/productos/planta/${id}`,          // DELETE - Eliminar una planta
  };
  


