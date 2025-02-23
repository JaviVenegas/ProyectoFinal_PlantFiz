import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { ENDPOINT } from "../config/constants";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

export const AddAddressForm = ({ setAddAddress }) => {
  const { session } = useAuth();

  const [formData, setFormData] = useState({
    direccion: "",
    ciudad: "",
    region: "",
    codigo_postal: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(ENDPOINT.createAddress, formData, {
        headers: {
          Authorization: `Bearer ${session?.token}`,
          "Content-Type": "application/json",
        },
      });

      setAddAddress(false);
    } catch (error) {
      console.error("Error al actualizar la dirección:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h3>Añadir Dirección</h3>
      <Form className="mt-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            type="text"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Región</Form.Label>
          <Form.Control
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Código Postal</Form.Label>
          <Form.Control
            type="text"
            name="codigo_postal"
            value={formData.codigo_postal}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => setAddAddress(false)}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </div>
      </Form>
    </Container>
  );
};
