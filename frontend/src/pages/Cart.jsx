import React from 'react';
import ProductCard from "../components/ProductCardCart";
import { Card, Form, Button, Col, Container, Row } from "react-bootstrap";
import { plantas } from '../data/data'; // Asegúrate de que plantas es un array de objetos
import { CartContext } from "../context/CartContext";
import { useContext } from 'react';

const Cart = () => {
        const { cart, total } = useContext(CartContext); 
  return (
    <div >
        <h1 className='d-flex mt-3 align-items-left align-self-sm justify-content-around my-5'> Carrito de compras</h1>
        <Container className= "d-flex flex-row align-items-center justify-content-between my5">
        <h5 className="ms-5"> PRODUCTO</h5>
        <h5> PRECIO</h5>
        <h5 className="me-5"> CANT.</h5>
        </Container>
      {/* Iterar sobre el array plantas */}
      {plantas.map((planta) => (
          // Crear un ProductCard por cada planta
          <ProductCard 
          key={planta.id} 
          product={{
              id: planta.id,
              precio: planta.precio,
              nombre_planta: planta.nombre_planta,
              stock: planta.stock,
              url: planta.url
            }} 
            />
        ))}
        <h2 className='d-flex mt-3 align-items-left align-self-sm justify-content-around my-5'> Total carrito de compras</h2>
        <Row className="d-flex flex-row mt-3 align-items-left align-self-sm justify-content-around my-5'"> 
            <Col md={6} className='fw-bold me-1 align-items-left '>Total </Col>
            <Col md={6}> ${total.toLocaleString()}  </Col>
        </Row>
        <Button variant="outline-secondary" className="w-100  mx-5" style={{ borderRadius: '0' }}>
                <div className="d-flex align-items-center justify-content-evenly"> Finalizar Compra</div>
              </Button>

    </div>
  );
}

export default Cart;
