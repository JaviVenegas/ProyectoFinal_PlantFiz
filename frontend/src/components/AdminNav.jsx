import { ListGroup } from "react-bootstrap";

export const AdminNav = () => {
  return (
    <div className="sidebar p-4 border-end">
      <ListGroup variant="flush">
        <ListGroup.Item action>Mi cuenta</ListGroup.Item>
        <ListGroup.Item action>Productos</ListGroup.Item>
        <ListGroup.Item action>Usuarios</ListGroup.Item>
        <ListGroup.Item action>Pedidos</ListGroup.Item>
        <ListGroup.Item action>Cerrar Sesi&oacute;n</ListGroup.Item>
      </ListGroup>
    </div>
  );
};
