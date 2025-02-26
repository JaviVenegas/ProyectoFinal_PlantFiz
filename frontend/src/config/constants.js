
export const URLBASE = import.meta.env.VITE_API_URL;

export const ENDPOINT = {
 
// Productos
// Categoria Plantas

    getPlantas: `${URLBASE}/productos/plantas`,          // GET - Obtener todas las plantas
    getPlantaPorId: (id) => `${URLBASE}/productos/planta/${id}`,          // GET - Obtener una planta por id
    agregarPlanta: `${URLBASE}/productos/planta`,          // POST - Crear una planta
    editarPlanta: (id) => `${URLBASE}/productos/planta/${id}`,          // PATCH - Editar una planta
    eliminarPlanta: (id) => `${URLBASE}/productos/planta/${id}`,          // DELETE - Eliminar una planta
  
  

  // Auth
  register: `${URLBASE}/user/createUser`,    // POST
  login: `${URLBASE}/user/login`,            // POST

  // User
  userProfile: `${URLBASE}/user/perfil`,     // GET (necesita token)
  updateUser: `${URLBASE}/user/updateUser`,  // PUT (necesita token)
  changePassword: `${URLBASE}/user/changePassword`, // PUT (necesita token)
  deleteUser: `${URLBASE}/user/deleteUser`,  // DELETE (necesita token)

  // Addresses (Direcciones)
  getAddresses: `${URLBASE}/user/directions/`,        // GET (necesita token)
  createAddress: `${URLBASE}/user/directions/createDirection`, // POST (necesita token)
  updateAddress: `${URLBASE}/user/directions/updateDirection`, // PUT (necesita token)
  deleteAddress: `${URLBASE}/user/directions/deleteDirection`, // DELETE (necesita token)

  // Productos (Faltan subrutas de productos)
  productos: `${URLBASE}/productos` // GET 
  
};

