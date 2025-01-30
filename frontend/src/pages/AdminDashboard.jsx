import { Sidebar } from "../components/Sidebar";
import { ProductCatalog } from "./ProductCatalog";
import { Container, Row, Col } from "react-bootstrap";


export const AdminDashboard = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Sidebar/>
        </Col>
        <Col md={9} className="p-4">
          <ProductCatalog />
        </Col>
      </Row>
    </Container>
  );
};
