import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ENDPOINT } from "../config/constants.js";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


 const AdminEditarInfoProducto = () => {
  const { id } = useParams(); // Obtiene el ID desde la URL
  const navigate = useNavigate();

  // Estado para manejar los datos del formulario
  const [nombre_planta, setNombrePlanta] = useState('');
  const [precio, setPrecio] = useState('');
  const [origen, setOrigen] = useState('');
  const [descripcion_hoja, setDescripcionHoja] = useState('');
  const [ideal_para, setIdealPara] = useState('');
  const [agua, setAgua] = useState('');
  const [luz, setLuz] = useState('');


 

  // 🔹 Función para obtener los datos de la planta
  const fetchPlanta = async () => {
    try {
      const { data } = await axios.get(ENDPOINT.getPlantaPorId(id));
      const planta = data.editado || {};
      
      setNombrePlanta(planta.nombre_planta || '');
      setPrecio(planta.precio || '');
      setOrigen(planta.origen || '');
      setDescripcionHoja(planta.descripcion_hoja || '');
      setIdealPara(planta.ideal_para || '');
      setAgua(planta.agua || '');
      setLuz(planta.luz || '');
    } catch (eror) {
      console.error( error );
     
    }
  };


  useEffect(() => {
    fetchPlanta();
  }, [id]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const cambios = {};

    if (nombre_planta) cambios.nombre_planta = nombre_planta;
    if (precio) cambios.precio = precio;
    if (origen) cambios.origen = origen;
    if (descripcion_hoja) cambios.descripcion_hoja = descripcion_hoja;
    if (ideal_para) cambios.ideal_para = ideal_para;
    if (agua) cambios.agua = agua;
    if (luz) cambios.luz = luz;

    if (Object.keys(cambios).length === 0) {
      alert("No se han realizado cambios para actualizar.");
      return;
    }

    try {
      const response = await axios.patch(ENDPOINT.editarPlanta(id), cambios);
      console.log("Datos actualizados:", response.data);
      
    } catch (err) {
      console.error("Error al actualizar la planta:", err);
      
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
              value={nombre_planta || ''}
              onChange={(e) => setNombrePlanta(e.target.value)}
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
              value={descripcion_hoja}
              onChange={(e) => setDescripcionHoja(e.target.value)}
              placeholder="Descripción Hojas"
            />
          </Col>
          
          <Col xs={12} md={12} className="d-flex align-items-center">
            <Form.Label className="mb-0" style={{ width: '150px' }}>Ideal para:</Form.Label>
            <Form.Control
              type="text"
              value={ideal_para}
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
          Guardar
        </Button>
        <Button 
        variant="outline-secondary" 
        className="mt-3 ms-3" 
        onClick={() => navigate(`/admin`)}
        style={{ borderRadius: '0' }} type="button">
          Cancelar
        </Button>
      </Form>
    </>
  );
};

export default AdminEditarInfoProducto;