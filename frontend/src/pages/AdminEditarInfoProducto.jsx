import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ENDPOINT } from "../config/constants.js";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


 const AdminEditarInfoProducto = () => {
  const { id } = useParams(); // Obtiene el ID desde la URL
  const navigate = useNavigate();

  // Estado para manejar los datos del formulario
  const [nombre_planta, setNombrePlanta] = useState('');
  const [precio, setPrecio] = useState('');
  const [origen, setOrigen] = useState('');
  const [descripcion_hojas, setDescripcionHojas] = useState('');
  const [ideal_para, setIdealPara] = useState('');
  const [agua, setAgua] = useState('');
  const [luz, setLuz] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [imagen_url, setImagen_url] = useState('');
  const [mensaje, setMensaje] = useState('');


 

  // Función para obtener los datos de la planta
  const fetchPlanta = async () => {
    try {
      const { data } = await axios.get(ENDPOINT.getPlantaPorId(id));
      const planta = data.editado || {};
      
      setNombrePlanta(planta.nombre_planta || '');
      setPrecio(planta.precio || '');
      setOrigen(planta.origen || '');
      setDescripcionHojas(planta.descripcion_hojas || '');
      setIdealPara(planta.ideal_para || '');
      setAgua(planta.agua || '');
      setLuz(planta.luz || '');
      setCantidad(planta.cantidad || '');
      setImagen_url(planta.imagen_url || '');
  

    } catch (error) {
      console.error(error );
     
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
    if (descripcion_hojas) cambios.descripcion_hojas = descripcion_hojas;
    if (ideal_para) cambios.ideal_para = ideal_para;
    if (agua) cambios.agua = agua;
    if (luz) cambios.luz = luz;
    if (cantidad) cambios.cantidad = cantidad;
    if (imagen_url) cambios.imagen_url = imagen_url;

    try {
      const response = await axios.patch(ENDPOINT.editarPlanta(id), cambios);

      if (response.status === 200 || response.status === 201) {
        setMensaje("🌱 Planta editada con éxito 🎉");
        toast.success("🌱 Planta editada con éxito 🎉");
      }

      navigate("/admin/products");
    } catch (err) {
      console.error("Error al actualizar la planta:", err);
      setMensaje("❌ Error al editar la planta");
      toast.error("❌ Error al editar la planta");
    }
  };


  return (
    <> 
      <h1 className='mt-3 my-5'>Editar datos del producto</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={12} className="d-flex align-items-center my-3">
            <Form.Label className="mb-0 me-3" style={{ width: '150px' }}>Nombre Producto:</Form.Label>
            <Form.Control
              type="text"
              value={nombre_planta || ''}
              onChange={(e) => setNombrePlanta(e.target.value)}
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
              value={descripcion_hojas}
              onChange={(e) => setDescripcionHojas(e.target.value)}
              placeholder="Descripción Hojas"
            />
          </Col>
          
          <Col xs={12} md={12} className="d-flex align-items-center my-3">
            <Form.Label className="mb-0 me-3" style={{ width: '150px' }}>Ideal para:</Form.Label>
            <Form.Control
              type="text"
              value={ideal_para}
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
          
          <Col xs={12} md={12} className=" d-flex align-items-center my-3">
            <Form.Label className="mb-0 me-3" style={{ width: '150px' }}>Luz:</Form.Label>
            <Form.Control
              type="text"
              value={luz}
              onChange={(e) => setLuz(e.target.value)}
              placeholder="Luz"
            />
          </Col>
          <Col xs={12} md={12} className=" d-flex align-items-center my-3">
            <Form.Label className="mb-0 me-3" style={{ width: '150px' }}>Cantidad:</Form.Label>
            <Form.Control
              type="text"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              placeholder="cantidad"
            />
          </Col>
          <Col xs={12} md={12} className=" d-flex align-items-center my-3">
            <Form.Label className="mb-0 me-3" style={{ width: '150px' }}> Imagen Url:</Form.Label>
            <Form.Control
              type="text"
              value={imagen_url}
              onChange={(e) => setImagen_url(e.target.value)}
              placeholder="Url imagen"
            />
          </Col>
        </Row>

        <Button 
        variant="outline-secondary" 
        className=" buttonAdmineditar mt-3" 
        style={{ borderRadius: '5px', color: 'white' }} type="submit">
          Guardar
        </Button>
        {mensaje && <p className="mt-3" > {mensaje}</p>}
        <Button 
        
        variant="outline-secondary" 
        className=" buttonAdmineditar mt-3 ms-3" 
        onClick={() => navigate(`/admin/products`)}
        style={{ borderRadius: '5px', color: 'white' }} type="button">
          Cancelar
        </Button>
      </Form>
    </>
  );
};

export default AdminEditarInfoProducto;