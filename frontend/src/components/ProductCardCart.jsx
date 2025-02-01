import React, { useState, useContext } from 'react';
import { Card, Form, Button, Col, Container } from 'react-bootstrap';
import { IoTrashOutline } from "react-icons/io5";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { removeFromCart, addCart, deletePlanta } = useContext(CartContext);

  // Obtener el count actual del producto (si no tiene count, lo inicializamos en 1)
  const count = product.count || 1;

  // Función para aumentar la cantidad
  const increment = () => {
    addCart({ ...product, count: 1 }); // Sumamos 1 a la cantidad
  };

  // Función para disminuir la cantidad
  const decrement = () => {
    if (count > 1) {
      removeFromCart(product.id); // Restamos 1 a la cantidad
    }
  };

  return (
    <Container className="my-3 p-3">
      <Card className="d-flex flex-row align-items-center">
        <Card.Img
          variant="left"
          src={product.url}
          alt={product.nombre_planta}
          className="me-3 d-flex align-items-center"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
        <Card.Body className="d-flex justify-content-around align-items-stretch">
          <Col md={3}>
            <Card.Title>{product.nombre_planta}</Card.Title>
            <Card.Text>
              <IoTrashOutline />
              <Button className= "outline-success" onClick={() => removeFromCart(product.id)}>QUITAR</Button>
            </Card.Text>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-2 d-flex align-items-center">
              <strong className="fs-6">${product.precio.toLocaleString()}</strong>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-2 d-flex align-items-center">
              {/* Muestra la cantidad */}
              <strong className="fs-6">Cantidad: {count}</strong>
            </Form.Group>

            {/* Botones de incrementar y decrementar */}
            <Button variant="outline-secondary me-5" onClick={decrement}>-</Button>
            <Button variant="outline-secondary" onClick={increment}>+</Button>
          </Col>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductCard;
