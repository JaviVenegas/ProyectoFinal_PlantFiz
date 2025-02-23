import React from 'react'
import { Container } from 'react-bootstrap'; // Asegúrate de importar Container desde Bootstrap

const Categorias = () => {
  return (
    <>
      <Container className="d-flex mt-3 justify-content-between">

        {/* Columna de Interior */}
        <div className="col-12 col-md-4 text-center">
          <img 
            onClick={() => window.scrollTo(0, 0)} 
            src="./images/interior.jpg" 
            alt="imagen de galeria" 
            className="img-fluid" 
          />
          <p className="fs-4 fw-bold">Interior</p>
        </div>

        {/* Columna de Suculentas */}
        <div className="col-12 col-md-4 text-center">
          <img 
            onClick={() => window.scrollTo(0, 0)} 
            src="./images/suculentas.jpg" 
            alt="imagen de galeria" 
            className="img-fluid" 
          />
          <p className="fs-4 fw-bold">Suculentas</p>
        </div>
        {/* Columna de Exterior */}
        <div className="col-12 col-md-4 text-center">
          <img 
            onClick={() => window.scrollTo(0, 0)} 
            src="./images/exterior.jpg" 
            alt="imagen de galeria" 
            className="img-fluid" 
          />
          <p className="fs-4 fw-bold">Exterior</p>
        </div>
      </Container>
    </>
  );
}

export default Categorias;
