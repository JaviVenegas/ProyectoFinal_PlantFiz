
import { Form, Col, Row, Button } from 'react-bootstrap';
import { ENDPOINT } from "../config/constants.js";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const AdminAgregarProducto = () => {
    const navigate = useNavigate();

    const [nombre_planta, setNombrePlanta] = useState('');
    const [precio, setPrecio] = useState('');
    const [origen, setOrigen] = useState('');
    const [descripcionHoja, setDescripcionHoja] = useState('');
    const [idealPara, setIdealPara] = useState('');
    const [agua, setAgua] = useState('');
    const [luz, setLuz] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
        
        
        try {
          const response = await axios.post(ENDPOINT.agregarPlanta, {
            nombre_planta,
            precio,
            origen,
            descripcionHoja,
            idealPara,
            agua,
            luz,
          });
          if ( response.status === 200 || response.status === 201) {
            setMensaje( "🌱 Planta agregada correctamente 🎉"); 
            toast.success("🌱 Planta agregada correctamente 🎉");
            setTimeout (() => setMensaje (""), 10000);
          } else {
            setMensaje("❌ Error al agregar la planta ");
            toast.error("❌ Error al agregar la planta");
          }
        
        } catch (error) {
          throw error;
        }
      };
   

  return (
    <>
       <h1 className='d-flex mt-3 align-items-left align-self-sm justify-content-around my-5'>Editar datos del producto</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={12} className="d-flex align-items-center my-3">
            <Form.Label className="mb-0 me-3" style={{ width: '150px' }}>Nombre Producto:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setNombrePlanta(e.target.value)}
              value={nombre_planta}
              placeholder= "Nombre de la planta"
            />
          </Col>
          
          <Col xs={12} md={12} className="d-flex align-items-center my-3">
            <Form.Label className="mb-0 me-3" style={{ width: '150px' }}>Precio:</Form.Label>
            <Form.Control
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              placeholder="Precio de la planta"
            />
          </Col>
          
          <Col xs={12} md={12} className="d-flex align-items-center my-3">
            <Form.Label className="mb-0 me-3" style={{ width: '150px' }}>Origen:</Form.Label>
            <Form.Control
              type="text"
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
              placeholder="Origen de la planta"
            />
          </Col>
          
          <Col xs={12} md={12} className="d-flex align-items-center my-3">
            <Form.Label className="mb-0 me-3" style={{ width: '150px' }}>Descripción Hojas:</Form.Label>
            <Form.Control
              type="text"
              value={descripcionHoja}
              onChange={(e) => setDescripcionHoja(e.target.value)}
              placeholder="Descripción Hojas"
            />
          </Col>
          
          <Col xs={12} md={12} className="d-flex align-items-center my-3">
            <Form.Label className="mb-0 me-3" style={{ width: '150px' }}>Ideal para:</Form.Label>
            <Form.Control
              type="text"
              value={idealPara}
              onChange={(e) => setIdealPara(e.target.value)}
              placeholder="Ideal para"
            />
          </Col>
          
          <Col xs={12} md={12} className="d-flex align-items-center my-3">
            <Form.Label className="mb-0 me-3" style={{ width: '150px' }}>Agua:</Form.Label>
            <Form.Control
              type="text"
              value={agua}
              onChange={(e) => setAgua(e.target.value)}
              placeholder="Agua"
            />
          </Col>
          
          <Col xs={12} md={12} className="d-flex align-items-center my-3">
            <Form.Label className="mb-0 me-3" style={{ width: '150px' }}>Luz:</Form.Label>
            <Form.Control
              type="text"
              value={luz}
              onChange={(e) => setLuz(e.target.value)}
              placeholder="Luz"
            />
          </Col>
        </Row>

        <Button variant="outline-secondary" 
        className="buttonAdmineditar mt-3" 
        style={{ borderRadius: '5px', color: 'white' }} 
        type="submit">
          Agregar nuevo producto
        </Button>
        {mensaje && <p className="mt-3" > {mensaje}</p>}

        <Button variant="outline-secondary" 
        onClick={() => navigate(`/admin`)}
        className="buttonAdmineditar mt-3 ms-3" 
        style={{ borderRadius: '5px', color: 'white' }} type="button">
          Cancelar
        </Button>
      </Form>
    </>
  )
}

export default AdminAgregarProducto


