import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Container, Row, Col } from 'react-bootstrap';
import { Sidebar } from '../components/Sidebar';

export const PerfilUsuario = () => {
  const { session } = useAuth();
  
  return (
    <Container fluid>
      <Row>
        {/* Sidebar - Columna izquierda */}
        <Col md={3} className="sidebar-column">
          <Sidebar /> {/* Componente de sidebar */}
        </Col>

        {/* Contenido principal - Columna derecha */}
        <Col md={9} className="p-4 content-column">
          {/* Encabezado del dashboard */}

          {/* Contenido dinámico de las rutas hijas */}
          <div className="user-content">
            <Outlet /> 
          </div>
        </Col>
      </Row>
    </Container>
  );
};