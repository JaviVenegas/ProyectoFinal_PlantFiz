import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import './Nav.css';

export const CustomNav = () => {
  return (
    <>
      {/* Barra superior */}
      <Navbar bg="light" expand="lg" className="border-bottom">
        <Container>
          <Nav className="">
          <Nav.Link href="#" className="nav-link-custom">Home</Nav.Link>
          <Nav.Link href="#" className="nav-link-custom">Catálogo</Nav.Link>
          </Nav>
          <div className="d-flex w-25">
            <Button 
              variant="outline-primary" 
              className="me-2 w-100 border-end" 
              style={{ borderRadius: '0' }}
            >
              Login
            </Button>
            <Button 
              variant="outline-secondary" 
              className="w-100" 
              style={{ borderRadius: '0' }}
            >
              <FaShoppingCart />
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
