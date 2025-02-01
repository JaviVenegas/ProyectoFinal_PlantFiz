// ProductCardGaleria.jsx
import React from 'react';
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import {  Container} from "react-bootstrap";


const ProductCardGaleria = ({ planta }) => {
    const navigate = useNavigate();
  return (
    <Container>
    <div className="card">
        <img onClick={() => navigate(`/DetalleProducto/${planta.id}`)} className="btn"
        src={planta.url} 
        alt={planta.nombre_planta} 
        />
      <div className="card-body d-flex justify-content-between ">
        <div>
        <h2 className="card-title fw-bolder fs-6">{planta.nombre_planta}</h2>
        <h4 className="card-text fs-6 fw-light text- p-1">
          <strong>Precio: ${planta.precio.toLocaleString()}</strong>
        </h4>
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

