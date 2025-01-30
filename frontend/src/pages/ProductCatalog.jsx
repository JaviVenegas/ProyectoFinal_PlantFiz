import { plantas } from "../data/data.js";
import { ProductCard } from "../components/ProductCard";
import { Container } from "react-bootstrap";

export const ProductCatalog = () => {
  return (
    <Container className="mt-4">
      <h2>Editar catálogo</h2>
      {plantas.map((planta) => (
        <ProductCard key={planta.id} product={planta} />
      ))}
    </Container>
  );
};