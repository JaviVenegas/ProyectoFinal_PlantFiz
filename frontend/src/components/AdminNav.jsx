import { Link } from 'react-router-dom';

export const AdminNav = () => {
  return (
    <nav className="admin-sidebar">
      <ul>
        <li>
          <Link to="/admin">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/products">Productos</Link>
        </li>
        <li>
          <Link to="/admin/users">Usuarios</Link>
        </li>
      </ul>
    </nav>
  );
};