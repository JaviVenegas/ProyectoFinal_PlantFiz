import { plantas } from "../data/data.js";
import { AdminCatalog } from "../components/AdminCatalog.jsx";
import { Container } from "react-bootstrap";

export const AdminCatalogPage = () => {
  return (
    <Container className="mt-4">
      <h2>Editar catálogo</h2>
      {plantas.map((planta) => (
        <AdminCatalog key={planta.id} product={planta} />
      ))}
    </Container>
  );
};