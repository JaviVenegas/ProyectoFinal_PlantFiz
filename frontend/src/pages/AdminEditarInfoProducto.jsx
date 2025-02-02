import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { plantas } from '../data/data';
import { AdminNav } from '../components/AdminNav';

const AdminEditarInfoProducto = ({ productoId }) => {
  // Establecer estado para los campos
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [origen, setOrigen] = useState('');
  const [descripcion_hoja, setDescripcion_hoja] = useState('');
  const [ideal_para, setIdealPara] = useState('');
  const [agua, setAgua] = useState('');
  const [luz, setLuz] = useState('');
  const [stock, setStock] = useState('');
  const [categorias, setcategorias] = useState('');
  const [url, setUrl] = useState('');  // URL de la imagen

  // Establecer los valores del formulario
  useEffect(() => {
    const producto = plantas.find(planta => planta.id === productoId);
    if (producto) {
      setNombre(producto.nombre_planta);
      setPrecio(producto.precio);
      setOrigen(producto.origen);
      setDescripcion_hoja(producto.descripcion_hoja);
      setIdealPara(producto.ideal_para);
      setAgua(producto.agua);
      setLuz(producto.luz);
      setStock(producto.stock);
      setcategorias(producto.categorias);
      setUrl(producto.Url);  // Asegúrate de que 'Url' sea la propiedad correcta de la imagen
    }
  }, [productoId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para guardar los cambios
    console.log('Datos guardados', { nombre, precio, origen });
  };

  return (
    <> 
      <AdminNav />
      <h1 className='d-flex mt-3 align-items-left align-self-sm justify-content-around my-5'> Editar datos del producto</h1>
      <Form onSubmit={handleSubmit}>
    
        <Row>
          <Col xs={12} md={12} className="d-flex align-items-center">
            <Form.Label className="mb-0" style={{ width: '150px' }}> Nombre Producto:</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre de la planta"
            />
          </Col>
          <Col xs={12} md={12} className="d-flex align-items-center">
            <Form.Label className="mb-0" style={{ width: '150px' }}> Precio: </Form.Label>
            <Form.Control
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              placeholder="Precio de la planta"
            />
          </Col>
          <Col xs={12} md={12} className="d-flex align-items-center">
            <Form.Label className="mb-0" style={{ width: '150px' }}> Origen: </Form.Label>
            <Form.Control
              type="text"
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
              placeholder="Origen de la planta"
            />
          </Col>
          <Col xs={12} md={12} className="d-flex align-items-center">
            <Form.Label className="mb-0" style={{ width: '150px' }}> Descripcion Hojas: </Form.Label>
            <Form.Control
              type="text"
              value={descripcion_hoja}
              onChange={(e) => setDescripcion_hoja(e.target.value)}
              placeholder="Descripcion Hojas"
            />
          </Col>
          <Col xs={12} md={12} className="d-flex align-items-center">
            <Form.Label className="mb-0" style={{ width: '150px' }}> Ideal para: </Form.Label>
            <Form.Control
              type="text"
              value={ideal_para}
              onChange={(e) => setIdealPara(e.target.value)}
              placeholder="Ideal para"
            />
          </Col>
          <Col xs={12} md={12} className="d-flex align-items-center">
            <Form.Label className="mb-0" style={{ width: '150px' }}> Agua: </Form.Label>
            <Form.Control
              type="text"
              value={agua}
              onChange={(e) => setAgua(e.target.value)}
              placeholder="agua"
            />
          </Col>
          <Col xs={12} md={12} className="d-flex align-items-center">
            <Form.Label className="mb-0" style={{ width: '150px' }}> Luz: </Form.Label>
            <Form.Control
              type="text"
              value={luz}
              onChange={(e) => setLuz(e.target.value)}
              placeholder="luz"
            />
          </Col>
          <Col xs={12} md={12} className="d-flex align-items-center">
            <Form.Label className="mb-0" style={{ width: '150px' }}> Stock: </Form.Label>
            <Form.Control
              type="text"
              value={stock}
              onChange={(e) => setOrigen(e.target.value)}
              placeholder="Stock"
            />
          </Col>
          <Col xs={12} md={12} className="d-flex align-items-center">
            <Form.Label className="mb-0" style={{ width: '150px' }}> Categorias: </Form.Label>
            <Form.Control
              type="text"
              value={categorias}
              onChange={(e) => setcategorias(e.target.value)}
              placeholder="Categorias"
            />
          </Col>
        </Row>
        <Button variant="outline-secondary" className="jd-flex mt-3 align-items-center align-self-sm-stretch justify-content-center mx-5" style={{ borderRadius: '0' }} type="submit">
          Guardar
        </Button>
        <Button variant="outline-secondary" className="jd-flex mt-3 align-items-center align-self-sm-stretch justify-content-center mx-5" style={{ borderRadius: '0' }} type="button">
          Cancelar
        </Button>
      </Form>
    </>
  );
};

export default AdminEditarInfoProducto;
