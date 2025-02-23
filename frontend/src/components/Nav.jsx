import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./Nav.css";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import miImagen from '../assets/logoplantfiz.png';



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
            <Nav.Link href="/" className="nav-link-custom">
              Home
            </Nav.Link>
            <Nav.Link href="/catalogo" className="nav-link-custom">
              Catálogo
            </Nav.Link>
          </Nav>
          <div className="d-flex w-25 ">
            {session ? (
              <Button
                className= "custom-primary  w-100 me-2"
                style={{ borderRadius: "5px", borderWidth: "1px" }}
                onClick={handleClickLogout}
              >
                {" "}
                Cerrar sesion{" "}
              </Button>
            ) : (
              <Button
                className=" custom-primary w-100 me-2"
                style={{ borderRadius: "5px", borderWidth: "1px", color: "#7d729b"}}
                onClick={handleClickLogin}
              >
                {" "}
                Iniciar sesion{" "}
              </Button>
            )}

            <Button
              className=" custom-primary w-100"
              style={{ borderRadius: "5px", borderWidth: "1px", color: "#7d729b"}}
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
          <div className="me-4"
            style={{ width: "120px", height: "120px", }}
          >  <img 
                src= {miImagen} 
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
              style={{ background: "#ddd", padding: "5px", borderRadius: "5px", }}
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
