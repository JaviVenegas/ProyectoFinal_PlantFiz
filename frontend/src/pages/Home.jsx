import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <h1>Bienvenido a PlantFiz 🌿</h1>
      <Link to="/catalog">Ver catálogo</Link>
    </div>
  );
};
