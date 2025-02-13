const {    //funciones a testear 
    obtenerPlantas,
    agregarPlanta, 
    editarPlanta,
    eliminarPlanta   
} = require('../../models/plantas');
const { DB } = require('../../config/db');

jest.mock('../../config/db'); 

describe('Modelo de plantas', () => {

  beforeEach(() => {
    jest.clearAllMocks();
});

  describe ( "llamar plantas", () => {

    test ('obtenerPlantas', async () => {
      
      const mockResponse = { 
        rowCount: 3,
        rows: [
          { id: 1, 
            nombre_planta: 'Planta 1', 
            precio: 100,
            origen: 'Origen 1', 
            descripcion_hojas: 'Descripción 1', 
            ideal_para: 'Ideal 1', 
            agua: 'Agua 1', 
            luz: 'Luz 1' 
          },
          { 
            id: 2, 
            nombre_planta: 'Planta 2', 
            precio: 200,
            origen: 'Origen 2', 
            descripcion_hojas: 'Descripción 2', 
            ideal_para: 'Ideal 2', 
            agua: 'Agua 2', 
            luz: 'Luz 2' 
          },
          { 
            id: 3, 
            nombre_planta: 'Planta 3', 
            precio: 300,
            origen: 'Origen 3', 
            descripcion_hojas: 'Descripción 3', 
            ideal_para: 'Ideal 3', 
            agua: 'Agua 3', 
            luz: 'Luz 3' }
          ] 
        };
  
      DB.query.mockResolvedValue(mockResponse);
      const result = await obtenerPlantas();
  
      expect(DB.query).toHaveBeenCalledWith('SELECT * FROM plantas limit $1', [12]);
      expect(result).toEqual(mockResponse);
        
      });
  });
  
  describe ( "probando agregar plantas nuevas", () => {
    
    test ('agregarPlanta', async () => {
      
      const nuevaPlanta = {    // Elementos de ejemplo
        nombre_planta: 'Planta 500', 
        precio: 23000,
        origen: 'Origen 500', 
        descripcion_hojas: 'Descripción 500', 
        ideal_para: 'Ideal 500', 
        agua: 'Agua 500', 
        luz: 'Luz 500' 
      };
      
      // El mockResponse debe tener la forma de la respuesta de la DB.query
      const mockResponse = { rows: [{ id: 500, ...nuevaPlanta }] };  // Respuesta esperada de la base de datos
      
      // Simula la respuesta de DB.query
      DB.query.mockResolvedValue(mockResponse);
      
      // Desestructuramos la planta para pasar sus propiedades como argumentos individuales
      const { nombre_planta, precio, origen, descripcion_hojas, ideal_para, agua, luz } = nuevaPlanta;
      
      // Llama a la función a testear pasando los parámetros individuales
      const result = await agregarPlanta(nombre_planta, precio, origen, descripcion_hojas, ideal_para, agua, luz);
      
      // Verifica que la consulta fue realizada correctamente con los valores esperados
      expect(DB.query).toHaveBeenCalledWith(
        `INSERT INTO plantas (nombre_planta, precio, origen, descripcion_hojas, ideal_para, agua, luz) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [
          nombre_planta,
          precio,
          origen,
          descripcion_hojas,
          ideal_para,
          agua,
          luz
        ]
      );
      
      // Verifica que el resultado devuelto sea el esperado
      expect(result).toEqual(mockResponse.rows[0]);
    });
  });
  
});


describe ( "Editar un producto", () => {
  
  test ('editarPlanta', async () => {
    
    const modificarPlanta= { 
      id: 2, 
      nombre_planta: 'Planta 1', 
      precio: 100,
      origen: 'Origen 1', 
      descripcion_hojas: 'Descripción 1'
       
    };
    
    DB.query.mockResolvedValue(mockResponse);
    const result = await editarPlanta();
    
    expect(DB.query).toHaveBeenCalledWith(`UPDATE plantas SET ${campos} WHERE id = %L RETURNING *`);
    expect(result).toEqual(mockResponse);
    
  });
});



describe ( "probando elimiar una planta", () => {
  
  test ('eliminarPlanta', async () => {
    
    const nuevaPlanta = {    // Elementos de ejemplo
      nombre_planta: 'Planta 500', 
      precio: 23000,
      origen: 'Origen 500', 
      descripcion_hojas: 'Descripción 500', 
      ideal_para: 'Ideal 500', 
      agua: 'Agua 500', 
      luz: 'Luz 500' 
    };
    
    // El mockResponse debe tener la forma de la respuesta de la DB.query
    const mockResponse = { rows: [{ id: 500, ...nuevaPlanta }] };  // Respuesta esperada de la base de datos
    
    // Simula la respuesta de DB.query
    DB.query.mockResolvedValue(mockResponse);
    
    // Desestructuramos la planta para pasar sus propiedades como argumentos individuales
    const { nombre_planta, precio, origen, descripcion_hojas, ideal_para, agua, luz } = nuevaPlanta;
    
    // Llama a la función a testear pasando los parámetros individuales
    const result = await eliminarPlanta(nombre_planta, precio, origen, descripcion_hojas, ideal_para, agua, luz);
    
    // Verifica que la consulta fue realizada correctamente con los valores esperados
    expect(DB.query).toHaveBeenCalledWith(
      `INSERT INTO plantas (nombre_planta, precio, origen, descripcion_hojas, ideal_para, agua, luz) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        nombre_planta,
        precio,
        origen,
        descripcion_hojas,
        ideal_para,
        agua,
        luz
      ]
    );
    
    // Verifica que el resultado devuelto sea el esperado
    expect(result).toEqual(mockResponse.rows[0]);
  });
});

});