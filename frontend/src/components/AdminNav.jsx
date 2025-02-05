import { ListGroup } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

export const AdminNav = () => {
  const { handleLogout } = useAuth();

  return (
    <div className="sidebar p-4 border-end">
      <ListGroup variant="flush">
        <ListGroup.Item action>Mi cuenta</ListGroup.Item>
        <ListGroup.Item action>Productos</ListGroup.Item>
        <ListGroup.Item action>Usuarios</ListGroup.Item>
        <ListGroup.Item action>Pedidos</ListGroup.Item>
        <ListGroup.Item action onClick={handleLogout}>Cerrar Sesi&oacute;n</ListGroup.Item>
      </ListGroup>
    </div>
  );
};
