import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../config/constants";
import axios from "axios";

export const UserEditForm = ({ setEditData }) => {
  const { session, handleSession } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rut: session?.rut || "",
    nombre: session?.nombre || "",
    apellido: session?.apellido || "",
    telefono: session?.telefono || "",
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.put(ENDPOINT.updateUser, formData, {
        headers: {
          Authorization: `Bearer ${session?.token}`,
          "Content-Type": "application/json",
        },
      });

      const { data } = await axios.get(ENDPOINT.userProfile, {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      });

      handleSession({
        ...session,
        user: data.user,
      });

      setEditData(false);
      navigate("/perfil/data");

    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error al actualizar datos";
      setError(errorMessage);
    }
  };

  const handleSubmitCancel = () => {
    setEditData(false);
    navigate("/perfil/data");
  };

  return (
    <Container className="p-3">
      <Container className="d-flex">
        <h3 className="mb-4">Editar Datos</h3>
      </Container>
      <Container className="d-flex mt-4">
        <Form
          className="w-50 border p-4 rounded shadow-sm"
          onSubmit={handleSubmit}
        >
          <Form.Group controlId="formRut" className="mb-3">
            <Form.Label>RUT</Form.Label>
            <Form.Control
              type="text"
              name="rut"
              value={formData.rut}
              onChange={handleOnChange}
            />
          </Form.Group>

          <Form.Group controlId="formNombre" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleOnChange}
            />
          </Form.Group>

          <Form.Group controlId="formApellido" className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleOnChange}
            />
          </Form.Group>

          <Form.Group controlId="formTelefono" className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleOnChange}
            />
          </Form.Group>

          {error && <div className="alert alert-danger">{error}</div>}

          <Container className="d-flex justify-content-center align-items-center mt-4 gap-5">
            <Button variant="dark" type="submit">
              Guardar
            </Button>

            <Button variant="dark" onClick={handleSubmitCancel}>
              Cancelar
            </Button>
          </Container>
        </Form>
      </Container>
    </Container>
  );
};
