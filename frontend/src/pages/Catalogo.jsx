import React from 'react';
import ProductCardGaleria from '../components/ProductCardGaleria';   // Diseño de la cards
import { plantas } from '../data/data';  // Array de plantas
import { Container, Button, Form } from "react-bootstrap";
import Categorias from '../components/Categorias';

 const Catalogo = () => {    // como se ordenan las cards en la galeria 
  return (
    <>
    <h1 className='d-flex mt-3 align-items-left align-self-sm justify-content-around'>Tienda</h1>
    <Categorias />
    <Container className="d-flex mt-3 align-items-center align-self-sm-stretch justify-content-around">  
      <Button variant="outline-secondary" className="w-100 me-5" style={{ borderRadius: '0' }}>
        <div className="d-flex align-items-center justify-content-evenly"> Resultados</div>
      </Button>
      <Button variant="outline-secondary" className="w-100  ms-5" style={{ borderRadius: '0' }}>
        <div className="d-flex align-items-center justify-content-evenly"> Filtros</div>
      </Button>
       </Container>
    <Container className="cd-flex mt-3 align-items-center justify-content-around">
      <div className="container-fluid p-0">
        <div className="row">
          {plantas.map((planta) => (  
            <div className="col-12 col-md-3" key={planta.id}>
              <ProductCardGaleria planta={planta} />  
            </div>
          ))}
        </div>
      </div>
    </Container>
    </>
  );
}

export default Catalogo
