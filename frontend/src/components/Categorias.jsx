import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // Asegúrate de importar Row y Col desde Bootstrap

const Categorias = () => {
  return (
    <>
      <Container className="mt-3">
        <Row className="justify-content-center">
          {/* Columna de Interior */}
          <Col xs={12} sm={6} md={4} className="text-center mb-4">
            <img 
              onClick={() => window.scrollTo(0, 0)} 
              src="./images/interior.jpg" 
              alt="imagen de galeria" 
              className="img-fluid" 
            />
            <p className="fs-4 fw-bold">Interior</p>
          </Col>

          {/* Columna de Suculentas */}
          <Col xs={12} sm={6} md={4} className="text-center mb-4">
            <img 
              onClick={() => window.scrollTo(0, 0)} 
              src="./images/suculentas.jpg" 
              alt="imagen de galeria" 
              className="img-fluid" 
            />
            <p className="fs-4 fw-bold">Suculentas</p>
          </Col>

          {/* Columna de Exterior */}
          <Col xs={12} sm={6} md={4} className="text-center mb-4">
            <img 
              onClick={() => window.scrollTo(0, 0)} 
              src="./images/exterior.jpg" 
              alt="imagen de galeria" 
              className="img-fluid" 
            />
            <p className="fs-4 fw-bold">Exterior</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Categorias;
