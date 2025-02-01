import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          {/* Columna 1: Información de la tienda */}
          <Col md={4} className="text-center">
            <h5>PlantFiz</h5>
            <p>
              Tu tienda favorita de plantas. Ofrecemos una gran variedad de
              plantas para tu hogar y jardín.
            </p>
          </Col>

          {/* Columna 2: Enlaces rápidos */}
          <Col md={4} className="text-center">
            <h5>Enlaces Rápidos</h5>
            <ul className="footer-links">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Catálogo</a>
              </li>
            </ul>
          </Col>

          {/* Columna 3: Contacto */}
          <Col md={4} className="text-center contact-info">
            <h5>Contacto</h5>
            <p>Email: info@plantfiz.com</p>
            <p>Teléfono: +123 456 789</p>
            <p>Dirección: Calle Falsa 123, Ciudad</p>
          </Col>
        </Row>

        {/* Derechos de autor */}
        <Row>
          <Col className="text-center mt-3">
            <p className="copyright">
              &copy; {new Date().getFullYear()} PlantFiz. Todos los derechos
              reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};


export default Footer