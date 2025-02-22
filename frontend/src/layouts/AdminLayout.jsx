import { Outlet } from "react-router-dom";
import { AdminNav } from "../components/AdminNav";
import { useAuth } from "../hooks/useAuth";
import { Container, Row, Col } from "react-bootstrap";
import "./AdminLayout.css";

export const AdminLayout = () => {
  const { session } = useAuth();
  return (
    <Container fluid className="admin-layout">
      <Row>
        {/* Sidebar - Columna izquierda */}
        <Col md={3} className="sidebar-column">
          <AdminNav /> {/* Tu componente de sidebar */}
        </Col>

        {/* Contenido principal - Columna derecha */}
        <Col md={9} className="p-4 content-column">
          {/* Encabezado del dashboard */}
          <div className="admin-header mb-4">
            <h1>Panel de Administración</h1>
            <p className="text-muted">
              Bienvenido, {session?.user?.nombre} {session?.user?.apellido}
            </p>
          </div>

          {/* Contenido dinámico de las rutas hijas */}
          <div className="admin-content">
            <Outlet />{" "}
            {/* Aquí se renderizará ProductCatalog u otros componentes */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
