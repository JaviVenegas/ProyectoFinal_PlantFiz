
import { Form, Col, Row, Button } from 'react-bootstrap';
import { ENDPOINT } from "../config/constants.js";
import axios from "axios";
import { useState, useEffect } from "react";

import React from 'react'

const AdminAgregarProducto = () => {

    const [nombre_planta, setNombrePlanta] = useState('');
    const [precio, setPrecio] = useState('');
    const [origen, setOrigen] = useState('');
    const [descripcionHoja, setDescripcionHoja] = useState('');
    const [idealPara, setIdealPara] = useState('');
    const [agua, setAgua] = useState('');
    const [luz, setLuz] = useState('');

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
      
          console.log("Datos actualizados:", response.data);
        } catch (error) {
          console.error("Error al actualizar la planta:", error);
        }
      };
   

  return (
    <>
       <h1 className='d-flex mt-3 align-items-left align-self-sm justify-content-around my-5'>Editar datos del producto</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={12} className="d-flex align-items-center">
            <Form.Label className="mb-0" style={{ width: '150px' }}>Nombre Producto:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setNombrePlanta(e.target.value)}
              value={nombre_planta}
              placeholder= "Nombre de la planta"
            />
          </Col>
          
          <Col xs={12} md={12} className="d-flex align-items-center">
            <Form.Label className="mb-0" style={{ width: '150px' }}>Precio:</Form.Label>
            <Form.Control
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              placeholder="Precio de la planta"
            />
          </Col>
          
          <Col xs={12} md={12} className="d-flex align-items-center">
            <Form.Label className="mb-0" style={{ width: '150px' }}>Origen:</Form.Label>
            <Form.Control
              type="text"
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
              placeholder="Origen de la planta"
            />
          </Col>
          
          <Col xs={12} md={12} className="d-flex align-items-center">
            <Form.Label className="mb-0" style={{ width: '150px' }}>Descripción Hojas:</Form.Label>
            <Form.Control
              type="text"
              value={descripcionHoja}
              onChange={(e) => setDescripcionHoja(e.target.value)}
              placeholder="Descripción Hojas"
            />
          </Col>
          
          <Col xs={12} md={12} className="d-flex align-items-center">
            <Form.Label className="mb-0" style={{ width: '150px' }}>Ideal para:</Form.Label>
            <Form.Control
              type="text"
              value={idealPara}
              onChange={(e) => setIdealPara(e.target.value)}
              placeholder="Ideal para"
            />
          </Col>
          
          <Col xs={12} md={12} className="d-flex align-items-center">
            <Form.Label className="mb-0" style={{ width: '150px' }}>Agua:</Form.Label>
            <Form.Control
              type="text"
              value={agua}
              onChange={(e) => setAgua(e.target.value)}
              placeholder="Agua"
            />
          </Col>
          
          <Col xs={12} md={12} className="d-flex align-items-center">
            <Form.Label className="mb-0" style={{ width: '150px' }}>Luz:</Form.Label>
            <Form.Control
              type="text"
              value={luz}
              onChange={(e) => setLuz(e.target.value)}
              placeholder="Luz"
            />
          </Col>
        </Row>

        <Button variant="outline-secondary" className="mt-3" style={{ borderRadius: '0' }} type="submit">
          Agregar nuevo producto
        </Button>
        <Button variant="outline-secondary" className="mt-3 ms-3" style={{ borderRadius: '0' }} type="button">
          Cancelar
        </Button>
      </Form>
    </>
  )
}

export default AdminAgregarProducto


