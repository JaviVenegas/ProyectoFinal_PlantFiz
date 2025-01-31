import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import './Nav.css';

export const CustomNav = () => {
  return (
    <>
      {/* Barra superior */}
      <Navbar expand="lg" className="border-bottom" style={{ background: "#ddd" }}>
        <Container>
          <Nav>
          <Nav.Link href="/" className="nav-link-custom">Home</Nav.Link>
          <Nav.Link href="/catalog" className="nav-link-custom">Catálogo</Nav.Link>
          </Nav>
          <div className="d-flex w-25">
            <Button 
              variant="outline-primary" 
              className="w-100 border-end" 
              style={{ borderRadius: '0' }}
              href="/login"
            >
              Login
            </Button>
            <Button 
              variant="outline-secondary" 
              className="w-100" 
              style={{ borderRadius: '0' }}
              href="/cart"
            >
              <div className="d-flex align-items-center justify-content-evenly">
              Cart
              <FaShoppingCart />
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
