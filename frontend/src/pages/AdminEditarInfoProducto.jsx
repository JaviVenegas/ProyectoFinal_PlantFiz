import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { plantas } from '../data/data';

const AdminEditarInfoProducto = () => {
  const { id } = useParams(); // Obtiene el ID desde la URL
  const plantaEncontrada = plantas.find(p => p.id === parseInt(id)); // Busca la planta

  // Estado para manejar los datos del formulario
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [origen, setOrigen] = useState('');
  const [descripcionHoja, setDescripcionHoja] = useState('');
  const [idealPara, setIdealPara] = useState('');
  const [agua, setAgua] = useState('');
  const [luz, setLuz] = useState('');
  const [stock, setStock] = useState('');
  const [categorias, setCategorias] = useState('');
  const [url, setUrl] = useState('');

  // Cargar los datos de la planta al estado
  useEffect(() => {
    if (plantaEncontrada) {
      setNombre(plantaEncontrada.nombre_planta);
      setPrecio(plantaEncontrada.precio);
      setOrigen(plantaEncontrada.origen);
      setDescripcionHoja(plantaEncontrada.descripcion_hoja);
      setIdealPara(plantaEncontrada.ideal_para);
      setAgua(plantaEncontrada.agua);
      setLuz(plantaEncontrada.luz);
      setStock(plantaEncontrada.stock);
      setCategorias(plantaEncontrada.categorias);
      setUrl(plantaEncontrada.url); // Asegúrate de que el nombre de la propiedad es correcto
    }
  }, [id, plantaEncontrada]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos guardados:', { nombre, precio, origen });
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
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre de la planta"
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
          
          <Col xs={12} md={12} className="d-flex align-items-center">
            <Form.Label className="mb-0" style={{ width: '150px' }}>Stock:</Form.Label>
            <Form.Control
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock"
            />
          </Col>

          <Col xs={12} md={12} className="d-flex align-items-center">
            <Form.Label className="mb-0" style={{ width: '150px' }}>Categorías:</Form.Label>
            <Form.Control
              type="text"
              value={categorias}
              onChange={(e) => setCategorias(e.target.value)}
              placeholder="Categorías"
            />
          </Col>
        </Row>

        <Button variant="outline-secondary" className="mt-3" style={{ borderRadius: '0' }} type="submit">
          Guardar
        </Button>
        <Button variant="outline-secondary" className="mt-3 ms-3" style={{ borderRadius: '0' }} type="button">
          Cancelar
        </Button>
      </Form>
    </>
  );
};

export default AdminEditarInfoProducto;
