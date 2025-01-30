import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Página no encontrada 🌱</h1>
      <p>La página que buscas no existe o ha sido movida.</p>
      <Link to="/" className="btn-home">
        Volver al inicio
      </Link>
    </div>
  );
};