import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./Nav.css";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const CustomNav = () => {
  const { session, handleLogout } = useAuth();
  const navigate = useNavigate();
  const { total } = useContext(CartContext);

  const handleClickLogout = () => {
    handleLogout();
    navigate("/");
  };

  const handleClickLogin = () => {
    navigate("/login");
  };

  return (
    <>
      {/* Barra superior */}
      <Navbar
        expand="lg"
        className="border-bottom"
        style={{ background: "#ddd" }}
      >
        <Container>
          <Nav>
            <Nav.Link href="/" className="nav-link-custom">
              Home
            </Nav.Link>
            <Nav.Link href="/catalogo" className="nav-link-custom">
              Catálogo
            </Nav.Link>

            {session ? (
              <Nav.Link href="/perfil" className="nav-link-custom">
                Perfil
              </Nav.Link>
            ) : null}
          </Nav>
          <div className="d-flex w-25">
            {session ? (
              <Button
                variant="outline-primary"
                className="w-100 border-end"
                style={{ borderRadius: "0" }}
                onClick={handleClickLogout}
              >
                {" "}
                Cerrar sesion{" "}
              </Button>
            ) : (
              <Button
                variant="outline-primary"
                className="w-100 border-end"
                style={{ borderRadius: "0" }}
                onClick={handleClickLogin}
              >
                {" "}
                Iniciar sesion{" "}
              </Button>
            )}

            <Button
              variant="outline-secondary"
              className="w-100"
              style={{ borderRadius: "0" }}
              href="/cart"
            >
              <div className="d-flex align-items-center justify-content-around">
                <FaShoppingCart /> Cart: ${total.toLocaleString()}
              </div>
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* Barra inferior */}
      <Container className="d-flex mt-3 align-items-center justify-content-around">
        <div className="">
          {/* Logo */}
          <div
            className="me-4"
            style={{ width: "150px", height: "100px", background: "#ddd" }}
          >
            Logo
          </div>
        </div>

        <div></div>

        <div className="d-flex w-50 text-center">
          {/* Sección derecha */}
          <div className="flex-grow-1 w-100">
            <div
              className="mb-2"
              style={{ background: "#ddd", padding: "5px" }}
            >
              Links Despacho
            </div>
            <Form className="d-flex text-center">
              <Form.Control
                type="text"
                placeholder="Buscar..."
                className="p-2"
              />
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CustomNav;
