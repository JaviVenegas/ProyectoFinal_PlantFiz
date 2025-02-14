import { useState } from "react";
import { Form, Button, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../config/constants";
import axios from "axios";

export const LoginForm = () => {
  const { handleSession, session } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await axios.post(ENDPOINT.login, formData);

      handleSession({
        token: data.token,
        user: data.user
      });

      if (data.user.rol === "admin") {
        navigate("/admin/");
      } else {
        navigate("/");
      }      

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
      setError(errorMessage);
    }
  };

  return (
    <>
      <Container className="p-5 my-5">
        <Container className="d-flex flex-column align-items-center">
          <h2 className="mb-4">Iniciar Sesión</h2>
        </Container>
        <Container className="d-flex flex-column align-items-center mt-4">
          <Form
            className="w-50 border p-4 rounded shadow-sm"
            onSubmit={handleSubmit}
          >
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

            <Button variant="dark" type="submit" className="w-100">
              Entrar
            </Button>

            {error && (
              <Container className="alert alert-danger mt-3" role="alert">
                Credenciales incorrectas, intente de nuevo
              </Container>
            )}
          </Form>
          <p className="mt-3 text-center p-3 d-flex flex-column">
            ¿No tienes cuenta?{" "}
            <Link to="/register">Registrate</Link> <br />
            <Nav.Link href="/">Ir a la página principal</Nav.Link>
          </p>
        </Container>
      </Container>
    </>
  );
};
