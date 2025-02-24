import "./Nav.css";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import miImagen from "../assets/logoplantfiz.png";

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
        style={{ background: "#c4bbdd" }}
      >
        <Container>
          <Nav>
            <Nav.Link as={Link} to="/" className="nav-link-custom" style ={{color: "#ffff"}}> 
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/catalogo" className="nav-link-custom" style ={{color: "#ffff"}}>
              Catálogo
            </Nav.Link>

            {session && (
              <Nav.Link
                onClick={() =>
                  navigate(
                    session?.user?.rol === "admin" ? "/admin/" : "/perfil"
                  )
                }
                className="nav-link-custom"
                style ={{color: "#ffff"}}
              >
                Perfil
              </Nav.Link>
            )}
          </Nav>
          <div className="d-flex align-items-center gap-3">
            {session ? (
              <Button
                className="custom-primary"
                style={{ borderRadius: "5px", borderWidth: "1px" }}
                onClick={handleClickLogout}
              >
                {" "}
                Cerrar Sesi&oacute;n{" "}
              </Button>
            ) : (
              <Button
                className="custom-primary"
                style={{
                  borderRadius: "5px",
                  borderWidth: "1px",
                  color: "#7d729b",
                }}
                onClick={handleClickLogin}
              >
                {" "}
                Iniciar Sesi&oacute;n{" "}
              </Button>
            )}

            <Button
              className="custom-primary"
              style={{
                borderRadius: "5px",
                borderWidth: "1px",
                color: "#ffff",
              }}
              as={Link}
              to="/cart"
            >
              <FaShoppingCart /> Cart: ${total.toLocaleString()}
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* Barra inferior */}
      <Container className="d-flex mt-3 align-items-center justify-content-around">
        <div className="">
          {/* Logo */}
          <div className="me-4" style={{ width: "120px", height: "120px" }}>
            {" "}
            <img
              src={miImagen}
              alt="Imagen de ejemplo"
              className="img-fluid rounded mt-2"
            />
          </div>
        </div>
        <div></div>
        <div className="d-flex w-50 text-center">
          {/* Sección derecha */}
          <div className="flex-grow-1 w-100">
            <div
              className="mb-2"
              style={{
                background: "#ddd",
                padding: "5px",
                borderRadius: "5px",
              }}
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
