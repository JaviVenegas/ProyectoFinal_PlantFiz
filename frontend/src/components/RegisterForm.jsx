import { useState } from "react";
import { Form, Button, Container, Nav } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { ENDPOINT } from "../config/constants";
import axios from "axios";

const { VITE_API_URL} = import.meta.env;
export const RegisterForm = () => {
  const { handleSession } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    rut: "",
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    telefono: "",
    rol: "admin"
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await axios.post(ENDPOINT.register, formData);

      handleSession({
        token: data.token,
        user: data.user
      });

      navigate("/login");

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al registrar usuario';
      setError(errorMessage);
    }
  };

  return (
    <>
      <Container className="p-5 my-5">
        <Container className="d-flex flex-column align-items-center">
          <h2 className="mb-4">Registro de Usuario</h2>
        </Container>
        <Container className="d-flex flex-column align-items-center mt-4">
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
                required
              />
            </Form.Group>

            <Form.Group controlId="formNombre" className="mb-3">
              <Form.Label>Nombres</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleOnChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formApellido" className="mb-3">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleOnChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCorreo" className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleOnChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formContrasena" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleOnChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTelefono" className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleOnChange}
                required
              />
            </Form.Group>

            {error && <div className="alert alert-danger">{error}</div>}

            <Button variant="dark" type="submit" className="w-100">
              Crear Cuenta
            </Button>
          </Form>
          <p className="mt-3 text-center p-3 d-flex flex-column">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login">Iniciar sesión</Link> <br />
            <Nav.Link as={Link} to="/">Ir a la página principal</Nav.Link>
          </p>
        </Container>
      </Container>
    </>
  );
};
