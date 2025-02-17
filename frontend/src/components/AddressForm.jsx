import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { ENDPOINT } from "../config/constants";

export const AddressForm = ({ setEditAddress, address }) => {
    console.log(address);
  const [formData, setFormData] = useState({
    direccion: addressData?.direccion || "",
    ciudad: addressData?.ciudad || "",
    region: addressData?.region || "",
    codigo_postal: addressData?.codigo_postal || "",
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
      response = await axios.put(`${ENDPOINT.updateAddress}/${addressData.id}`, formData, {
        headers: {
          Authorization: `Bearer ${session?.token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Respuesta del servidor:", response);

      setEditAddress(false); // Cerrar el formulario
    } catch (error) {
      console.error("Error al actualizar la dirección:", error);
      alert("Hubo un error al actualizar la dirección");
    }
  };

  return (
    <Container className="mt-4">
      <h3>Editar Dirección</h3>
      <Form onSubmit={handleSubmit}>
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
          <Button variant="secondary" onClick={() => setEditAddress(false)}>
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
