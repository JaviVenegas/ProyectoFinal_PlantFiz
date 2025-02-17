export const URLBASE = 'http://localhost:3000';

export const ENDPOINT = {
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
  updateAddress: (id) => `${URLBASE}/user/directions/updateDirection/${id}`, // PUT (necesita token)
  deleteAddress: (id) => `${URLBASE}/user/directions/deleteDirection/${id}`, // DELETE (necesita token)

  // Productos (Faltan subrutas de productos)
  productos: `${URLBASE}/productos` // GET 
  
};

