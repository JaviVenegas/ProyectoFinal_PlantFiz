import { useState } from "react";
import { Card, Form, Button, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [stock, setStock] = useState(product.stock);
  const [isAvailable, setIsAvailable] = useState(product.available);

  return (
    <Container className="my-3 p-3">
      <h1 className='d-flex mt-3 align-items-left align-self-sm justify-content-around'> Carrito de compras</h1>
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
            <Card.Text>Stock actual: {stock} unidades</Card.Text>
          </Col>

          <Col md={3}>
            <Form.Group className="mb-2 d-flex align-items-center">
              <Form.Label className="me-2">Modificar stock:</Form.Label>
              <Form.Control
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                style={{ width: "70px" }}
              />
            </Form.Group>

            <Link
              to={`/product/${product.id}`}
              className="text-primary">Editar datos producto</Link>
          </Col>
        </Card.Body>

        <Form className="ms-auto d-flex flex-column">
          <Form.Check
            type="checkbox"
            label="No disponible"
            checked={!isAvailable}
            onChange={() => setIsAvailable(!isAvailable)}
          />
          <Form.Check type="checkbox" label="Eliminar" />
        </Form>
      </Card>
    </Container>
  );
};

export default ProductCard;
