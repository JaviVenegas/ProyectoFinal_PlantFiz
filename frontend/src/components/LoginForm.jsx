import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formContrasena" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100">
              Entrar
            </Button>
          </Form>
          <p className="mt-3 text-center">
            ¿No tienes cuenta? <br></br>
            <Link to="/register">Registrate</Link>
          </p>
        </Container>
      </Container>
    </>
  );
};
