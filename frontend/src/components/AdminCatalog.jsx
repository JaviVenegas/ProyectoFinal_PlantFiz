import { useState,} from "react";
import { Card, Form, Button, Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export const AdminCatalog = ({ product }) => {
  const [stock, setStock] = useState(product.stock);
  const [isAvailable, setIsAvailable] = useState(product.available);

  const navigate = useNavigate();
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
            <Card.Text>Stock actual: {product.stock} unidades</Card.Text>
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

            <Button
              variant="primary"
              onClick={() => navigate(`/admin/AdminEditarInfoProducto/${product.id}`)}
            >
              Editar datos producto
            </Button>

            {/* <Link
              to={`/admin/AdminEditarInfoProducto/${product.id}`}
              className="text-primary">Editar datos producto</Link> */}


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
