import { ListGroup } from "react-bootstrap";

export const Sidebar = () => {
  return (
    <div className="sidebar p-3 border-end">
      <ListGroup variant="flush">
        <ListGroup.Item action>Mi cuenta</ListGroup.Item>
        <ListGroup.Item action>Mis pedidos</ListGroup.Item>
        <ListGroup.Item action>Mis direcciones</ListGroup.Item>
        <ListGroup.Item action>Mis datos</ListGroup.Item>
        <ListGroup.Item action>Mis favoritos</ListGroup.Item>
      </ListGroup>
    </div>
  );
};
