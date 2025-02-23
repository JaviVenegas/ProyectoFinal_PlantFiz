import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="sidebar p-3 border-end">
      <ListGroup variant="flush">
        <ListGroup.Item action as={Link} to="/perfil/data">Mi cuenta</ListGroup.Item> 
        <ListGroup.Item action as={Link} to="/perfil/addresses">Mis direcciones</ListGroup.Item> 
        <ListGroup.Item action as={Link} to="/perfil/orders">Mis pedidos</ListGroup.Item> 
        <ListGroup.Item action as={Link} to="/perfil/favorites">Mis favoritos</ListGroup.Item> 
      </ListGroup>
    </div>
  );
};
