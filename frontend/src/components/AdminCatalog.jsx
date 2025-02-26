import { useState, useEffect } from "react";
import { Card, Form, Button, Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ENDPOINT } from "../config/constants.js";
import axios from "axios";
import "./admin.css";

export const AdminCatalog = ({ product }) => {
  const [cantidad, setCantidad] = useState(product.cantidad ?? "");
  const [isAvailable, setIsAvailable] = useState(product.available);
  const [isDeleted, setIsDeleted] = useState(false);

  const borrarPlanta = async (id) => {
    try {
      await axios.delete(ENDPOINT.eliminarPlanta(id));
      
      window.location.reload(); // Actualiza la lista de productos después de eliminar
    } catch (error) {
      console.error("Error al eliminar la planta:", error);
    }
  };

  const navigate = useNavigate();

  const getPlantaPorId = async (id) => {
    try {
      const { data } = await axios.get(ENDPOINT.getPlantaPorId(id));
      return data.planta;
    } catch (error) {
      console.error("Error al obtener la planta:", error);

    }
  };

  useEffect(() => {
    getPlantaPorId(product.id).then((planta) => {
      if (planta) {
        setCantidad(planta.cantidad ?? ""); 
        setIsAvailable(planta.available);
      }
    });
  }, [product.id]);
  


  return (
    <Container fluid className="my-3 p-3">
      <Card className="d-flex flex-row align-items-center"
      style={{
        width: "100%", 
        maxWidth: "100%",  
        minWidth: "100%",  
    }}>
        <Card.Img
          className="mx-3 d-flex align-items-center"   
          src={product.imagen_url}
          style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "5px"}}
          alt={product.nombre_planta}
        />
        <Card.Body className="d-flex justify-content-around align-items-stretch">
          <Col md={3}>
            <Card.Title>{product.nombre_planta}</Card.Title>
            <Card.Text>Stock actual: {product.cantidad} unidades</Card.Text>
          </Col>

          <Col md={3}>
            <Form.Group className="mb-2 d-flex align-items-center">
              <Form.Label className="me-2">Modificar stock:</Form.Label>
              <Form.Control
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                style={{ width: "70px" }}
              />
            </Form.Group>

            <Button
              className=" buttonAdmin me-2 "
              variant="primary"
              onClick={() => navigate(`/admin/AdminEditarInfoProducto/${product.id}`)}
              style={{ borderRadius: "5px", borderWidth: "1px", backgroundcolor: "#7d729b"}}
            >
              Editar datos producto
            </Button>
          </Col>
        </Card.Body>

        <Form className="ms-auto d-flex flex-column me-5">
          <Form.Check 
            type="checkbox" 
            label="Eliminar"
            checked={isDeleted}
            onChange={() => {
              setIsDeleted(true);
              borrarPlanta(product.id);
            }}
          />
        </Form>
      </Card>
    </Container>
  );
};
