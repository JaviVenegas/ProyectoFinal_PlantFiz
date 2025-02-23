import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../config/constants";
import axios from "axios";

export const ChangePasswordForm = ({ setEditPassword }) => {
  const { session } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    contrasenaActual:"",
    contrasenaNueva:"",
    confirmacionContrasenaNueva:""
    // currentPassword: "",
    // newPassword: "",
    // confirmPassword: "",
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      // Aquí debes agregar la petición para actualizar la contraseña
      await axios.put(ENDPOINT.changePassword, formData,
        {
          headers: {
            Authorization: `Bearer ${session?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setEditPassword(false);
      navigate("/perfil/data");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error al actualizar la contraseña";
      setError(errorMessage);
    }
  };

  const handleSubmitCancel = () => {
    setEditPassword(false);
    navigate("/perfil/data");
  };

  return (
    <Container className="p-3">
      <Container className="d-flex">
        <h3 className="mb-4">Cambiar Contraseña</h3>
      </Container>
      <Container className="d-flex mt-4">
        <Form
          className="w-50 border p-4 rounded shadow-sm"
          onSubmit={handleSubmit}
        >
          <Form.Group controlId="formContrasenaActual" className="mb-3">
            <Form.Label>Contraseña Actual</Form.Label>
            <Form.Control
              type="password"
              name="contrasenaActual"
              value={formData.contrasenaActual}
              onChange={handleOnChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formNuevaContrasena" className="mb-3">
            <Form.Label>Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="contrasenaNueva"
              value={formData.contrasenaNueva}
              onChange={handleOnChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formConfirmarNuevaContrasena" className="mb-3">
            <Form.Label>Confirmar Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="confirmacionContrasenaNueva"
              value={formData.confirmacionContrasenaNueva}
              onChange={handleOnChange}
              required
            />
          </Form.Group>

          {error && <div className="alert alert-danger">{error}</div>}

          <Container className="d-flex justify-content-center align-items-center mt-4 gap-5">
            <Button variant="dark" type="submit">
              Guardar
            </Button>

            <Button variant="dark" onClick={handleSubmitCancel}>
              Volver
            </Button>
          </Container>
        </Form>
      </Container>
    </Container>
  );
};
