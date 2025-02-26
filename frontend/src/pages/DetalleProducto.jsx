import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ElijePlantfiz from "../components/ElijePlantfiz";
import Header from "../components/Header";
import { Col, Row, Container, Button, Badge } from 'react-bootstrap';
import { IoSunnyOutline, IoWaterOutline } from "react-icons/io5";
import { LuHouse } from "react-icons/lu";
import { BiWorld } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { ENDPOINT } from "../config/constants.js";
import axios from "axios";

const DetalleProducto = () => {
  const { id } = useParams();
  const { addCart, cart } = useContext(CartContext);
  const [planta, setPlanta] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchPlanta = async () => {
    try {
      const { data } = await axios.get(ENDPOINT.getPlantaPorId(id));

      setPlanta(data.planta);
    } catch (error) {
    console.error('Error al obtener planta:', error);
    setPlanta(null);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchPlanta();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!planta) {
    return <div>Planta no encontrada</div>;
  }

  const getProductCount = (productId) => {
    const product = cart.find(item => item.id === productId);
    return product ? product.count : 0;
  };

  const currentProductCount = getProductCount(planta.id);

  return (
    <Container>
      <Row>
        <Col md={6} className="mt-4 ">
          <img 
          src={planta.imagen_url || 'default-image.jpg'} 
          alt={planta.nombre_planta}
          style={{ width: "80%", height: "70%", objectFit: "cover", borderRadius: "8px" }} 
          className="card-img-top rounded ms-5 d-block" />
          <div className="mt-4 ms-5"> 
            <FaHeart className="fs-4" /> Guardar como favorito</div>
        </Col>
        <Col md={5} className="d-flex justify-content-end ms-4">
          <div className="card-body">
            <h2 className="card-title text-start  mt-4 mb-4 fs-4">{planta.nombre_planta}</h2>
            <h2 className="card-title text-start mt-4 mb-4 fs-6"> <BiWorld className="fs-4" /> Origen: {planta.origen}</h2>
            <p className="card-text"> Descripcion de la planta: {planta.descripcion_hojas}</p>
            <h4 className="card-text text-start p-1">
              <strong className="fs-6"> Precio: ${planta.precio.toLocaleString()}</strong>
            </h4>
            <Button 
              variant="outline-secondary" 
              className="w-100 me-5 my-5" 
              style={{ borderRadius: '5px' }} 
              onClick={() => addCart({ ...planta, count: 1 })}
            >
              <div 
              className="d-flex align-items-center justify-content-evenly">  
                Añadir al carrito
                {currentProductCount > 0 && (
                  <Badge bg="outline-secondary" className="ms-2">
                    {currentProductCount}
                  </Badge>
                )}
              </div>
            </Button>
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    <LuHouse className="me-2 fs-4" /> Ideal para 
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <strong>{planta.ideal_para}</strong>  
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <IoWaterOutline className="me-2 fs-3" /> Agua
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <strong>{planta.agua}</strong> 
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    <IoSunnyOutline className="me-2 fs-3" /> Luz 
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <strong>{planta.luz}.</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Header/>
      <ElijePlantfiz />
    </Container>
  );
};

export default DetalleProducto;
