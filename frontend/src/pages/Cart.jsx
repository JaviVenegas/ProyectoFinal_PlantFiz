import React, { useContext } from 'react';
import { Card, Form, Button, Col, Container, Row } from "react-bootstrap";
import { IoTrashOutline } from "react-icons/io5";
import { CartContext } from "../context/CartContext";



const Cart = () => {
    const { cart, addCart, removeFromCart, deletePlanta, total } = useContext(CartContext);

    return (
        <Container className="my-5">
            <h1 className="text-center my-4">Carrito de Compras</h1>

            {cart.length === 0 ? (
                <p className="text-center">El carrito está vacío.</p>
            ) : (
                <>
                    {/* Info del carrito */}
                    <Container className="d-flex flex-column my-3 w-100">
                        {cart.map((item) => (
                            <Card key={item.id} className="d-flex flex-row align-items-center my-3 p-3 shadow-sm">
                                <Card.Img
                                    src={item.imagen_url}
                                    alt={item.nombre_planta}
                                    className="me-3"
                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                />

                                <Card.Body className="d-flex justify-content-between align-items-center w-100">
                                    <Col md={3}>
                                        <Card.Title>{item.nombre_planta}</Card.Title>
                                        <div className="d-flex align-items-center">
                                            <IoTrashOutline />
                                            <Button 
                                                variant="outline-danger" 
                                                className="ms-2"
                                                onClick={() => deletePlanta(item.id)}
                                            >
                                                QUITAR
                                            </Button>
                                        </div>
                                    </Col>

                                    <Col md={3} className="text-center">
                                        <strong className="fs-6">${item.precio.toLocaleString()}</strong>
                                    </Col>

                                    <Col md={3} className="d-flex align-items-center justify-content-between">
                                        <Button variant="outline-secondary" onClick={() => removeFromCart(item.id)}>-</Button>
                                        <Form.Group className="mx-2">
                                            <strong className="fs-6">{item.count}</strong>
                                        </Form.Group>
                                        <Button variant="outline-secondary" onClick={() => addCart({ ...item, count: 1 })}>+</Button>
                                    </Col>
                                </Card.Body>
                            </Card>
                        ))}
                    </Container>

                    {/* Total y Finalizar Compra */}
                    <div className="text-center my-4">
                        <h5>Total: ${total.toLocaleString()}</h5>
                        <Button variant="success" className="mt-3">Finalizar Compra</Button>
                    </div>
                </> 
            )}
        </Container>
    );
};

export default Cart;

