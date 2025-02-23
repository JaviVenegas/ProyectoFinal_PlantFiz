// ProductCardGaleria.jsx
import React from 'react';
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import {  Container} from "react-bootstrap";
import "../../src/components/catalogo.css";

const ProductCardGaleria = ({ planta }) => {
    const navigate = useNavigate();
  return (
    <Container>
    <div className="card">
        <img onClick={() => navigate(`/DetalleProducto/${planta.id}`)} className=" cardimg btn p-0 m-0"
        
        src={planta.imagen_url} 
        alt={planta.nombre_planta} 
        />
      <div className="card-body d-flex justify-content-between ">
        <div>
        <h3 className="card-title fw-bolder fs-6">{planta.nombre_planta}</h3>
        <h5 className="card-text fs-6 fw-light text">
          <strong>Precio: ${planta.precio.toLocaleString()}</strong>
        </h5>
        </div>
        <div className="d-flex align-items-center"> 
        <FaHeart className="fs-3" /> 
      </div>
      </div>
    </div>
    </Container>
   
  );
}

export default ProductCardGaleria;  

