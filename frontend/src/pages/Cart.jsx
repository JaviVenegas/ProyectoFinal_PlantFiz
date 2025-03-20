import React, { useContext } from 'react';
import { Card, Form, Button, Col, Container, Row } from "react-bootstrap";
import { IoTrashOutline } from "react-icons/io5";
import { CartContext } from "../context/CartContext";

const Cart = () => {
    const { cart, addCart, removeFromCart, deletePlanta, total } = useContext(CartContext);

    return (
        <Container fluid className="my-5 px-4">  
            <h1 className="text-center my-4">Carrito de Compras</h1>

            {cart.length === 0 ? (
                <p className="text-center">El carrito está vacío.</p>
            ) : (
                <>
                    {/* Info del carrito */}
                    <Row className="justify-content-center my-3">  
                        {cart.map((item) => (
                            <Col xs={12} key={item.id}> 
                                <Card 
                                    className="w-100 my-3 p-3 shadow-sm" 
                                    style={{
                                        width: "100%",  
                                        maxWidth: "100%",  
                                        minWidth: "100%",  
                                    }}
>

                                    <Row className="align-items-center"> 
                                        <Col xs={3} className="text-center">
                                            <Card.Img
                                                src={item.imagen_url}
                                                
                                                alt={item.nombre_planta}
                                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                            />
                                        </Col>

                                        <Col xs={6}>
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

                                        <Col xs={3} className="text-center">
                                            <strong className="fs-6">${item.precio.toLocaleString()}</strong>
                                            <div className="d-flex justify-content-center mt-2">
                                                <Button variant="outline-secondary" onClick={() => removeFromCart(item.id)}>-</Button>
                                                <Form.Group className="mx-2">
                                                    <strong className="fs-6">{item.count}</strong>
                                                </Form.Group>
                                                <Button variant="outline-secondary" onClick={() => addCart({ ...item, count: 1 })}>+</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* Total y Finalizar Compra */}
                    <div className="text-center my-4">
                        <h5>Total: ${total.toLocaleString()}</h5>
                        <Button style={{ background: "#a6bd75", borderBlockColor: "#a6bd75" }} className="mt-3">Finalizar Compra</Button>
                    </div>
                </> 
            )}
        </Container>
    );
};

export default Cart;


