import { ListGroup } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export const AdminNav = () => {
  const { handleLogout } = useAuth();

  return (
    <div className="sidebar p-4 border-end">
      <ListGroup variant="flush">
        <ListGroup.Item action as={Link} to="/admin/">Mi cuenta</ListGroup.Item>
        <ListGroup.Item action as={Link} to="/admin/products">Productos</ListGroup.Item>
        <ListGroup.Item action as={Link} to="/catalogo">Cat&aacute;logo</ListGroup.Item>
        <ListGroup.Item action>Usuarios</ListGroup.Item>
        <ListGroup.Item action>Pedidos</ListGroup.Item>
        <ListGroup.Item action onClick={handleLogout}>Cerrar Sesi&oacute;n</ListGroup.Item>
      </ListGroup>
    </div>
  );
};
